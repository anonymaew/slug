import { filter } from 'domutils';
import { useEffect, useState } from 'react';

import { AllergenFilter } from '../interfaces/allergenFilter';
import { Meal } from '../interfaces/diningList';

const DiningMenu = (props: {
  meals: Meal[];
  filters: AllergenFilter[];
  loading: boolean;
}) => {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    setMeals(() => {
      return props.meals
        .map((meal) => {
          return {
            name: meal.name,
            categories: meal.categories
              .map((category) => {
                return {
                  name: category.name,
                  menus: category.menus.filter((menu) => {
                    const allergens = menu.allergens.map(
                      (allergen) => allergen.name
                    );
                    return props.filters
                      .filter((filter) => filter.checked)
                      .every((filter) =>
                        filter.type === "Allergy"
                          ? !allergens.includes(filter.name)
                          : allergens.includes(filter.name)
                      );
                  }),
                };
              })
              .filter((category) => category.menus.length > 0),
          };
        })
        .filter((meal) => meal.categories.length > 0);
    });
  }, [props.meals, props.filters]);

  return (
    <div className="text-base sm:text-lg">
      {props.loading ? (
        <p className="my-12 text-5xl font-black text-center animate-pulse text-zinc-500">
          Loading
        </p>
      ) : meals.length === 0 ? (
        <p className="my-12 text-5xl font-black text-center text-zinc-500">
          No menu available
        </p>
      ) : (
        meals.map((meal, mealIndex) => {
          return (
            <div
              key={mealIndex}
              className="w-full p-2 pt-0 my-4 bg-white border rounded-lg shadow-md border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 sm:pt-2 sm:p-4"
            >
              <h3 className="sticky my-2 text-lg font-bold text-center rounded-md shadow-sm sm:text-xl top-28 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100">
                {meal.name}
              </h3>
              {meal.categories.map((category, categoryIndex) => {
                return (
                  <div
                    key={categoryIndex}
                    className="mt-1 border-t border-zinc-300 dark:border-zinc-700"
                  >
                    <p className="italic">{category.name}</p>
                    <div className="mx-4">
                      {category.menus.map((menu, menuIndex) => {
                        return (
                          <div key={menuIndex} className="flex justify-between">
                            <span className="">{menu.name}</span>
                            <span className="">
                              {menu.price !== null && (
                                <span className="font-bold text-green-700 dark:text-green-300">
                                  {menu.price.toFixed(2)}
                                </span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
};

export default DiningMenu;
