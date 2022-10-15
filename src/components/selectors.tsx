import { Dispatch, SetStateAction } from 'react';

import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { DiningLists, Location } from '../interfaces/diningList';

const Selectors = (props: {
  data: DiningLists;
  location: Location;
  setLocation: Dispatch<SetStateAction<Location>>;
}) => {
  return (
    <div className="sticky z-10 w-full top-2">
      <Listbox value={props.location} onChange={props.setLocation}>
        <Listbox.Button className="relative flex items-center justify-between w-full p-2 text-lg font-bold text-left transition duration-200 ease-in-out border-black rounded-lg shadow-lg cursor-pointer sm:text-xl sm:px-4 bg-amber-900 text-amber-100 dark:bg-amber-100 dark:text-amber-900 border-1 border-opacity-5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
          <span className="">{props.location.name}</span>
          <span className="">
            <ChevronDownIcon className="w-5 h-5"></ChevronDownIcon>
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute w-full mt-2 text-base bg-white border-black rounded-md shadow-lg dark:bg-zinc-700 border-1 border-opacity-10 focus:outline-none">
          {props.data.locations
            .filter((locationItem) => locationItem.name !== props.location.name)
            .map((locationItem, locationIndex) => (
              <Listbox.Option
                key={locationIndex}
                className={({ active }) =>
                  `relative block p-2 truncate cursor-default select-none sm:text-lg ${
                    active ? "bg-amber-100 text-amber-900" : ""
                  }`
                }
                value={locationItem}
              >
                <span className="">{locationItem.name}</span>
              </Listbox.Option>
            ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};
export default Selectors;
