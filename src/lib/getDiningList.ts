import { load } from 'cheerio';

import { Category, DiningLists, Location, Meal, Menu } from '../interfaces/diningList';

const domain = "https://nutrition.sa.ucsc.edu/";
const homePageLink = "https://nutrition.sa.ucsc.edu/location.aspx";

const fetchContent = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "th-TH,th;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie:
        "WebInaCartLocation=; WebInaCartDates=; WebInaCartMeals=; WebInaCartRecipes=; WebInaCartQtys=",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
  });
  const content = await response.text();
  return content;
};

const getDiningList = async (date?: Date): Promise<DiningLists> => {
  try {
    const locationsContent = await fetchContent(homePageLink);
    const $m = load(locationsContent);

    const locations = $m(".locations")
      .toArray()
      .map(async (locationElement, i) => {
        const aTag = $m(locationElement).find("a");
        const locationName = aTag.text();

        const query = date
          ? `&WeeksMenus=UCSC+-+This+Week%27s+Menus&myaction=read&dtdate=${
              date.getMonth() + 1
            }%2f${date.getDate()}%2f${date.getFullYear()}`
          : "";
        const locationLink = domain + aTag.attr("href") + query;

        const locationContent = await fetchContent(locationLink);
        const $ = load(locationContent);

        return {
          name: locationName,
          date: $(".shortmenutitle").text().split(" ").slice(2).join(" "),
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
        } as Location;
      });
    const result = {
      locations: await Promise.all(locations),
      updated: Date.now(),
    };

    //fix mysterious bug of double first recipes
    for (let location of result.locations)
      for (let meal of location.meals)
        if (meal.categories.length > 1) meal.categories[0].menus.splice(1, 1);

    for (let location of result.locations) {
      if (location.meals.length === 1) {
        location.meals = location.meals[0].categories.map((category) => {
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
      location.meals = location.meals.filter(
        (meal) => meal.categories.length !== 0
      );
    }

    return result;
  } catch (err) {
    console.log(err);
    return {
      locations: [{ name: "error", date: "", meals: [] }],
      updated: Date.now(),
    };
  }
};

export default getDiningList;
