import { Dispatch, SetStateAction } from 'react';

import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { AllergenFilter } from '../interfaces/allergenFilter';
import { DiningLists, Location } from '../interfaces/diningList';
import Calendar from './calendar';

const DiningSelector = (props: {
  data: DiningLists;
  location: number;
  setLocation: Dispatch<SetStateAction<number>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  allergens: AllergenFilter[];
}) => (
  <div className="sticky z-10 w-full top-2 ">
    <Listbox value={props.location} onChange={props.setLocation}>
      <Listbox.Button className="relative flex items-center justify-between w-full p-2 text-lg font-bold text-left transition duration-200 ease-in-out border-black rounded-lg shadow-lg cursor-pointer sm:text-xl sm:px-4 bg-amber-900 text-amber-100 dark:bg-amber-100 dark:text-amber-900 border-1 border-opacity-5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
        <span className="">{props.data.locations[props.location].name}</span>
        <span className="">
          <ChevronDownIcon className="w-5 h-5"></ChevronDownIcon>
        </span>
      </Listbox.Button>
      <Listbox.Options className="absolute w-full mt-2 text-base bg-white border-black rounded-md shadow-lg dark:bg-zinc-700 border-1 border-opacity-10 focus:outline-none">
        {props.data.locations
          .map((_, index) => index)
          .filter((_, index) => index !== props.location)
          .map((locationIndex) => (
            <Listbox.Option
              key={locationIndex}
              className={({ active }) =>
                `relative block p-2 truncate cursor-default select-none sm:text-lg ${
                  active ? "bg-amber-100 text-amber-900" : ""
                }`
              }
              value={locationIndex}
            >
              <span className="">
                {props.data.locations[locationIndex].name}
              </span>
            </Listbox.Option>
          ))}
      </Listbox.Options>
    </Listbox>
    <div className="flex justify-between px-4 py-1 mt-2 text-base font-bold rounded-lg bg-amber-900 dark:bg-amber-100 text-amber-100 dark:text-amber-900">
      <Calendar date={props.date} setDate={props.setDate} />
      <button
        className="underline rounded-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-500 w-fit"
        onClick={() => props.setModalOpen(true)}
      >
        {`Allergen filter${
          props.allergens.filter((i) => i.checked).length > 0
            ? ` (${props.allergens.filter((i) => i.checked).length})`
            : ""
        }`}
      </button>
    </div>
  </div>
);

export default DiningSelector;
