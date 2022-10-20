import { Dispatch, SetStateAction } from 'react';

import { XMarkIcon } from '@heroicons/react/24/solid';

import { MetroRouteDetail, StopDetail } from '../interfaces/metroLists';

const MetroStopDetail = (props: {
  routes: MetroRouteDetail[];
  stopDetail: StopDetail;
  setStopFocus: Dispatch<SetStateAction<number | undefined>>;
}) => {
  return (
    <div className="fixed w-screen p-2 text-base text-black bottom-10 dark:text-white sm:text-lg">
      <div className="relative w-full max-w-xl p-4 mx-auto bg-white rounded-lg shadow-md dark:bg-zinc-800 max-h-96">
        <h2 className="p-2 pt-0 pr-8 text-lg font-bold border-b sm:text-xl border-zinc-700 dark:border-zinc-300">
          {props.routes
            .map((route) => route.stops)
            .flat()
            .find((stop) => stop.id === props.stopDetail.id)?.name || ""}
        </h2>
        <button
          className="absolute top-5 right-5"
          onClick={() => props.setStopFocus(undefined)}
        >
          <XMarkIcon className="w-5 aspect-square" />
        </button>
        <div className="px-2 pt-2">
          {props.stopDetail.arrivals.length === 0 ? (
            <p className="text-2xl font-black text-center text-zinc-500">
              No bus currently
            </p>
          ) : (
            props.stopDetail.arrivals.map((arrival, index) => (
              <div key={index} className="py-2">
                <span className="p-4 py-1 mx-4 font-bold text-indigo-100 bg-indigo-900 rounded-md dark:bg-indigo-100 dark:text-indigo-900">
                  {arrival.bus.name}
                </span>
                <span>
                  {arrival.minutes === 0
                    ? "arriving"
                    : `${arrival.minutes} minite${
                        arrival.minutes > 1 ? "s" : ""
                      }`}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MetroStopDetail;
