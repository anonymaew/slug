import { useEffect, useState } from 'react';

import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { DiningLists, Location } from '../interfaces/diningList';
import Scrape from '../lib/lists';

const Page = (props: { data: DiningLists; built: string }) => {
  const [day, setDay] = useState("Today");
  const [location, setLocation] = useState<Location>(props.data.locations[0]);

  return (
    <div className="max-w-xl p-2 mx-auto">
      <div className="sticky z-10 w-full top-2 ">
        <Listbox value={location} onChange={setLocation}>
          <Listbox.Button className="relative flex items-center justify-between w-full p-2 text-lg font-bold text-left border-black rounded-lg shadow-lg cursor-pointer sm:px-4 bg-amber-900 text-amber-100 border-1 border-opacity-5 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className="">{location.name}</span>
            <span className="">
              <ChevronDownIcon className="w-5 h-5"></ChevronDownIcon>
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute w-full mt-2 text-base bg-white border-black rounded-md shadow-lg border-1 border-opacity-10 focus:outline-none">
            {props.data.locations
              .filter((locationItem) => locationItem.name !== location.name)
              .map((locationItem, locationIndex) => (
                <Listbox.Option
                  key={locationIndex}
                  className="relative p-2 text-gray-900 cursor-default select-none hover:bg-amber-100 hover:text-amber-900"
                  value={locationItem}
                >
                  <span className="">{locationItem.name}</span>
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <main className="my-4 text-sm sm:text-base">
        {location.days
          .filter((dayItem) => dayItem.name === day)
          .map((day, dayIndex) => {
            return (
              <div key={dayIndex}>
                {day.meals.map((meal, mealIndex) => {
                  return (
                    <div
                      key={mealIndex}
                      className="w-full p-2 my-2 border border-black rounded-lg shadow-md sm:p-4 border-opacity-10"
                    >
                      <h3 className="sticky my-2 text-lg font-bold text-center rounded-md shadow-sm top-16 bg-amber-100 text-amber-900">
                        {meal.name}
                      </h3>
                      {meal.categories.map((category, categoryIndex) => {
                        return (
                          <div
                            key={categoryIndex}
                            className="mt-1 border-t border-black border-opacity-20"
                          >
                            <p className="italic ">{category.name}</p>
                            <div className="ml-4">
                              {category.menus.map((menu, menuIndex) => {
                                return (
                                  <li
                                    key={menuIndex}
                                    className="flex justify-between"
                                  >
                                    <span className="">{menu.name}</span>

                                    <span className="">
                                      {menu.allergens.map(
                                        (allergen, allergenIndex) => {
                                          return (
                                            <span key={allergenIndex}>
                                              <img
                                                className="inline w-4 h-4 mx-1"
                                                src={`/icons/${allergen.name}.gif`}
                                                alt={allergen.name}
                                              />
                                            </span>
                                          );
                                        }
                                      )}
                                    </span>
                                  </li>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </main>

      <footer className="text-sm text-gray-600">
        <p>Last updated:{props.data.updated}</p>
        <p>Last built:{props.built}</p>
      </footer>
    </div>
  );
};

export const getStaticProps = async () => {
  const data = await Scrape();
  console.log(data.locations.length);

  return {
    props: {
      data,
      built: `${new Date().toLocaleDateString(
        "en-US"
      )} ${new Date().toLocaleTimeString("en-US")}`,
    },
  };
};

export default Page;
