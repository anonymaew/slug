import { Lists } from '../interfaces/lists';

const Page = (props: { data: Lists }) => {
  return (
    <div>
      <p>{props.data.updated}</p>
      {props.data.locations.map((location, locationIndex) => {
        return (
          <div key={locationIndex}>
            <p>{location.name}</p>
            <ul>
              {location.days.map((day, dayIndex) => {
                return (
                  <li key={dayIndex}>
                    <p>{day.name}</p>
                    <ul>
                      {day.meals.map((meal, mealIndex) => {
                        return (
                          <li key={mealIndex}>
                            <p>{meal.name}</p>
                            <ul>
                              {meal.categories.map(
                                (category, categoryIndex) => {
                                  return (
                                    <li key={categoryIndex}>
                                      <p>{category.name}</p>
                                      <ul>
                                        {category.menus.map(
                                          (menu, menuIndex) => {
                                            return (
                                              <li key={menuIndex}>
                                                <p>{menu.name}</p>
                                                <ul>
                                                  {menu.allergens.map(
                                                    (
                                                      allergen,
                                                      allergenIndex
                                                    ) => {
                                                      return (
                                                        <li key={allergenIndex}>
                                                          <p>{allergen.name}</p>
                                                        </li>
                                                      );
                                                    }
                                                  )}
                                                </ul>
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const data = await fetch("https://ucsc-dining-menu-scrape.wl.r.appspot.com");
  const json = await data.json();

  return {
    props: {
      data: {
        locations: json,
        updated: new Date().toISOString(),
      },
    },
  };
};

export default Page;
