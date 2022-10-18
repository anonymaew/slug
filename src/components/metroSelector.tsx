import { Dispatch, SetStateAction } from 'react';

import { RadioGroup } from '@headlessui/react';

import { MetroRoute } from '../interfaces/metroLists';

const MetroSelector = (props: {
  data: MetroRoute[];
  route: MetroRoute | undefined;
  setRoute: Dispatch<SetStateAction<MetroRoute | undefined>>;
}) => {
  return (
    <div className="fixed top-0 left-0 z-10 w-full p-4 overflow-auto no-scrollbar">
      <div className="mx-auto w-fit">
        <RadioGroup value={props.route} onChange={props.setRoute}>
          <RadioGroup.Label className="sr-only">Route</RadioGroup.Label>
          <div className="flex flex-row">
            {props.data.map((routeItem, routeIndex) => (
              <RadioGroup.Option
                as="button"
                key={routeIndex}
                value={routeItem}
                className={({ checked }) =>
                  `p-1 px-4 m-1 text-base font-bold transition duration-200 ease-in-out rounded-lg shadow-lg cursor-pointer sm:text-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                    checked
                      ? "sticky bg-indigo-900 dark:bg-indigo-100 text-indigo-100 dark:text-indigo-900"
                      : "bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100 "
                  }`
                }
              >
                {routeItem.name}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
export default MetroSelector;
