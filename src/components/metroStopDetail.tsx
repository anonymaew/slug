import { Dispatch, SetStateAction } from 'react';

import { XMarkIcon } from '@heroicons/react/24/solid';

import { RouteDetail, StopDetail } from '../interfaces/metroLists';

const MetroStopDetail = (props: {
  routes: RouteDetail[];
  stopDetail: StopDetail;
  setStopFocus: Dispatch<SetStateAction<string | undefined>>;
}) => {
  return (
    <div className="fixed w-screen p-2 text-base text-black bottom-10 dark:text-white sm:text-lg">
      <div className="relative w-full max-w-xl p-2 mx-auto bg-white rounded-lg hadow-md bg-opacity-90 dark:bg-opacity-90 dark:bg-black sm:p-4 ">
        <h2 className="p-2 pt-0 pr-8 text-lg font-bold border-b sm:text-xl border-zinc-700 dark:border-zinc-300">
          {props.routes
            .map((route) => route.stops)
            .flat()
            .find((stop) => stop.id === props.stopDetail.id)?.name || ""}
        </h2>
        <button
          className="absolute top-3 sm:top-5 right-5"
          onClick={() => props.setStopFocus(undefined)}
        >
          <XMarkIcon className="w-5 aspect-square" />
        </button>
        <div className="p-2 overflow-auto no-scrollbar max-h-44 sm:max-h-60">
          {props.stopDetail.arrivals.length === 0 ? (
            <p className="text-2xl font-black text-center text-zinc-500">
              No bus currently
            </p>
          ) : (
            props.stopDetail.arrivals
              .sort((a, b) => a.minutes - b.minutes)
              .map((arrival, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 px-6"
                >
                  <div>
                    <div className="inline-block w-16 py-1 mr-4 font-bold text-center text-indigo-100 bg-indigo-900 rounded-md dark:bg-indigo-100 dark:text-indigo-900">
                      {arrival.bus.route}
                    </div>
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
                  <div>
                    {new Date(
                      Date.now() + arrival.minutes * 60000
                    ).toLocaleTimeString("en-US", {
                      timeZone: "America/Los_Angeles",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MetroStopDetail;
