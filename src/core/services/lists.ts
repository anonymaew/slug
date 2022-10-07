import cheerio from 'cheerio';
import chromium from 'chrome-aws-lambda';

import { Category, DiningLists, Location, Meal, Menu } from '../../interfaces/diningList';

const domain = "https://nutrition.sa.ucsc.edu/";
const homePageLink = "https://nutrition.sa.ucsc.edu/location.aspx";

const Scrape = async (): Promise<DiningLists> => {
  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      defaultViewport: chromium.defaultViewport,
      ignoreHTTPSErrors: true,
    });

    const locationsPage = await browser.newPage();
    await locationsPage.goto(homePageLink, {
      waitUntil: "networkidle2",
    });

    const locationsContent = await locationsPage.content();
    const $m = cheerio.load(locationsContent);

    const locations = $m(".locations")
      .toArray()
      .map(async (locationElement, i) => {
        const aTag = $m(locationElement).find("a");
        const locationName = aTag.text();
        const locationLink = domain + aTag.attr("href");
        const locationPage = await browser.newPage();
        await locationPage.goto(locationLink, {
          waitUntil: "networkidle2",
        });
        const content = await locationPage.content();
        const $ = cheerio.load(content);

        return {
          name: locationName,
          days: ["Today"].map((day) => {
            return {
              name: day,
              date: new Date().toLocaleDateString("en-US"),
              meals: $("body > table:nth-child(4) > tbody > tr")
                .toArray()
                .map((mealElement, i) => {
                  const categories: Category[] = [];
                  $(mealElement)
                    .find(
                      "td > table > tbody > tr:nth-child(2) > td > table > tbody > tr"
                    )
                    .toArray()
                    .forEach((rowElement, i) => {
                      const text = $(rowElement).find("span").text();
                      if (text[0] === "-")
                        categories.push({
                          name: text.split("-")[2].trim(),
                          menus: [],
                        });
                      else
                        categories[categories.length - 1].menus.push({
                          name: $(rowElement)
                            .find(".shortmenurecipes")
                            .find("span")
                            .text()
                            .trim(),
                          allergens: $(rowElement)
                            .find("img")
                            .toArray()
                            .map((allergenElement, i) => {
                              return {
                                name:
                                  $(allergenElement)
                                    .attr("src")
                                    ?.split("/")[1]
                                    ?.split(".")[0] ?? "",
                              };
                            })
                            .filter((allergen) => allergen.name !== ""),
                          price: (() => {
                            const priceElement = $(rowElement)
                              .find(".shortmenuprices")
                              .find("span")
                              .text()
                              .replace("$", "");
                            return priceElement.length < 2
                              ? null
                              : parseFloat(priceElement);
                          })(),
                        });
                    });

                  return {
                    name: $(mealElement).find(".shortmenumeals").text(),
                    categories: categories,
                  };
                }),
            };
          }),
        } as Location;
      });
    const result = {
      locations: await Promise.all(locations),
      updated: `${new Date().toLocaleDateString(
        "en-US"
      )} ${new Date().toLocaleTimeString("en-US")}`,
    };

    for (let location of result.locations) {
      for (let day of location.days) {
        if (day.meals.length === 1) {
          day.meals = day.meals[0].categories.map((category) => {
            return {
              name: category.name,
              categories: [
                {
                  name: "",
                  menus: category.menus,
                },
              ],
            };
          });
        }
        day.meals = day.meals.filter((meal) => meal.categories.length !== 0);
      }
    }

    await browser.close();
    return result;
  } catch (err) {
    console.log(err);
    return {
      locations: [{ name: "error", days: [] }],
      updated: `${new Date().toLocaleDateString(
        "en-US"
      )} ${new Date().toLocaleTimeString("en-US")}`,
    };
  }
};

export default Scrape;
