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
      <div className="relative w-full max-w-xl p-2 mx-auto bg-white rounded-lg shadow-md sm:p-4 dark:bg-zinc-800">
        <h2 className="p-2 pr-8 text-lg font-bold bg-white border-b dark:bg-zinc-800 sm:text-xl border-zinc-700 dark:border-zinc-300">
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
        <div className="p-2 overflow-auto no-scrollbar max-h-64">
          {props.stopDetail.arrivals.length === 0 ? (
            <p className="text-2xl font-black text-center text-zinc-500">
              No bus currently
            </p>
          ) : (
            props.stopDetail.arrivals
              .sort((a, b) => a.minutes - b.minutes)
              .map((arrival, index) => (
                <div key={index} className="py-2">
                  <span className="p-4 py-1 mx-4 font-bold text-indigo-100 bg-indigo-900 rounded-md dark:bg-indigo-100 dark:text-indigo-900">
                    {arrival.bus.name}
                  </span>
                  <span>
                    {/* hour minute */}
                    {arrival.minutes === 0
                      ? "Arriving"
                      : `${
                          arrival.minutes >= 60
                            ? `${Math.floor(arrival.minutes / 60)} hour${
                                arrival.minutes >= 120 ? "s" : ""
                              } `
                            : ""
                        }${
                          arrival.minutes % 60 !== 0
                            ? `${arrival.minutes % 60} minute${
                                arrival.minutes % 60 > 1 ? "s" : ""
                              }`
                            : ""
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
