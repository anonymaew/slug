import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

import { Category, Lists, Location } from '../../interfaces/lists';

const domain = "https://nutrition.sa.ucsc.edu/";
const homePageLink = "https://nutrition.sa.ucsc.edu/location.aspx";

const Scrape = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const locationsPage = await browser.newPage();
    await locationsPage.goto(homePageLink, {
      waitUntil: "networkidle2",
    });

    const locationsContent = await locationsPage.content();
    const $m = cheerio.load(locationsContent);

    const result = {
      locations: $m(".locations")
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
        }),
      updated: new Date().toLocaleString("en-US"),
    };
    //write a json file from result

    // const content = await page.content();
    // //capture page
    // await page.screenshot({ path: "screenshot.png" });

    await browser.close();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export default Scrape;
