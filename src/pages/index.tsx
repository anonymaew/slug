import { useEffect, useState } from 'react';

import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import Scrape from '../core/services/lists';
import { DiningLists, Location } from '../interfaces/diningList';

const Page = (props: { data: DiningLists; built: string }) => {
  const [day, setDay] = useState("Today");
  const [location, setLocation] = useState<Location>(props.data.locations[0]);

  return (
    <div className="mx-auto max-w-xl p-2">
      <div className="sticky top-2 w-full z-10 ">
        <Listbox value={location} onChange={setLocation}>
          <Listbox.Button className="relative w-full flex sm:px-4  text-lg justify-between items-center rounded-lg bg-amber-900 text-amber-100 font-bold p-2 text-left cursor-pointer shadow-lg border-1 border-black border-opacity-5 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className="">{location.name}</span>
            <span className="">
              <ChevronDownIcon className="w-5 h-5"></ChevronDownIcon>
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute w-full mt-2 rounded-md bg-white text-base shadow-lg border-1 border-black border-opacity-10 focus:outline-none">
            {props.data.locations
              .filter((locationItem) => locationItem.name !== location.name)
              .map((locationItem, locationIndex) => (
                <Listbox.Option
                  key={locationIndex}
                  className="relative cursor-default select-none p-2 text-gray-900 hover:bg-amber-100 hover:text-amber-900"
                  value={locationItem}
                >
                  <span className="">{locationItem.name}</span>
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <main className="my-4 sm:text-base text-sm">
        {location.days
          .filter((dayItem) => dayItem.name === day)
          .map((day, dayIndex) => {
            return (
              <div key={dayIndex}>
                {day.meals.map((meal, mealIndex) => {
                  return (
                    <div
                      key={mealIndex}
                      className="w-full rounded-lg p-2 sm:p-4 my-2 border border-black border-opacity-10 shadow-md"
                    >
                      <h3 className="sticky top-16 text-center bg-amber-100 text-amber-900 rounded-md text-lg font-bold my-2 shadow-sm">
                        {meal.name}
                      </h3>
                      {meal.categories.map((category, categoryIndex) => {
                        return (
                          <div
                            key={categoryIndex}
                            className="border-t border-black border-opacity-20 mt-1"
                          >
                            <p className=" italic">{category.name}</p>
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
                                                className="w-4 h-4 mx-1 inline"
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

      <footer className="text-gray-600 text-sm">
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
