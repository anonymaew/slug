import Link from 'next/link';

import { MapIcon, QueueListIcon } from '@heroicons/react/24/solid';

import MainLayout from '../layouts/main';

const HomePage = () => {
  return (
    <MainLayout>
      <div className="absolute flex flex-col justify-center w-full h-screen px-4 -top-2">
        <h1 className="py-4 text-2xl font-bold text-center">[ slug ]</h1>
        <Link href="/metro">
          <button className="flex items-center justify-between w-full p-4 my-4 text-lg font-bold text-indigo-100 transition duration-200 ease-in-out bg-indigo-900 rounded-lg shadow-md dark:text-indigo-900 sm:text-xl focus:outline-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-indigo-100 hover:bg-indigo-700 dark:hover:bg-indigo-300 hover:scale-105">
            <span className="text-3xl font-bold">[</span>
            <span>
              <MapIcon className="inline w-5 mr-4 aspect-square" />
              Live Metro Map
            </span>
            <span className="text-3xl font-bold">]</span>
          </button>
        </Link>
        <Link href="/dining">
          <button className="flex items-center justify-between w-full p-4 my-4 text-lg font-bold duration-200 ease-in-out rounded-lg shadow-md items-centertransition text-amber-100 bg-amber-900 dark:text-amber-900 sm:text-xl focus:outline-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-500 hover:bg-amber-700 dark:bg-amber-100 dark:hover:bg-amber-200 hover:scale-105">
            <span className="text-3xl font-bold">[</span>
            <span>
              <QueueListIcon className="inline w-5 mr-4 aspect-square" />
              Dining Menu
            </span>
            <span className="text-3xl font-bold">]</span>
          </button>
        </Link>
        <div className="h-24"></div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
