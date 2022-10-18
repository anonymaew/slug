import { Dispatch, SetStateAction } from 'react';

import { Switch } from '@headlessui/react';

import { MetroRouteDetail } from '../interfaces/metroLists';

const MetroSelector = (props: {
  data: MetroRouteDetail[];
  selectedRoutes: number[];
  setSelectedRoutes: Dispatch<SetStateAction<number[]>>;
}) => {
  return (
    <div className="fixed top-0 left-0 z-10 w-full p-4 overflow-auto no-scrollbar">
      <div className="flex flex-row mx-auto w-fit">
        {props.data.map((route, index) => (
          <div key={route.id} className="">
            <Switch
              as="button"
              checked={props.selectedRoutes.includes(index)}
              onChange={(checked: boolean) => {
                if (checked)
                  props.setSelectedRoutes([...props.selectedRoutes, index]);
                else
                  props.setSelectedRoutes(
                    props.selectedRoutes.filter((i) => i !== index)
                  );
              }}
              className={`${
                props.selectedRoutes.includes(index)
                  ? "bg-indigo-900 text-indigo-100"
                  : "bg-indigo-100 text-indigo-900"
              } font-bold rounded-md p-4 py-1 mx-1 focus:outline-none focus:outline-4 focus:outline-offset-2 focus:outline-indigo-500`}
            >
              {route.name}
            </Switch>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MetroSelector;
