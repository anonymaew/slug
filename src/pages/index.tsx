import Head from 'next/head';
import { useState } from 'react';

import AllergenFilterModal from '../components/allergenFilterModal';
import DiningMenu from '../components/diningMenu';
import Selectors from '../components/selectors';
import { AllergenFilter, DefaultAllergens } from '../interfaces/allergenFilter';
import { DiningLists, Location } from '../interfaces/diningList';
import diningList from '../lib/diningLists';

const Page = (props: { data: DiningLists }) => {
  const [day, setDay] = useState<string>("Today");
  const [location, setLocation] = useState<Location>(props.data.locations[0]);
  const [allergens, setAllergens] =
    useState<AllergenFilter[]>(DefaultAllergens);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="text-black bg-white dark:bg-zinc-900 dark:text-zinc-100">
      <div className="relative max-w-xl min-h-screen p-2 pb-24 mx-auto">
        <Head>
          <title>UCSC Dining Menu</title>
          <meta
            name="description"
            content="A better and faster solution for UCSC Dining Menu lookup"
          />
        </Head>
        <Selectors
          data={props.data}
          location={location}
          setLocation={setLocation}
        />
        <main className="my-4 text-sm sm:text-base">
          <div className="flex justify-between px-4 text-base font-bold sm:text-lg text-amber-900 dark:text-amber-100">
            <span>
              {location.days.find((dayItem) => dayItem.name === day)?.date ||
                ""}
            </span>
            <button
              className="underline rounded-full focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-500 w-fit"
              onClick={() => setModalOpen(true)}
            >
              {`Allergen filter${
                allergens.filter((i) => i.checked).length > 0
                  ? ` (${allergens.filter((i) => i.checked).length})`
                  : ""
              }`}
            </button>
          </div>
          <DiningMenu
            meals={
              location.days.find((dayItem) => dayItem.name === day)?.meals || []
            }
            filters={allergens}
          />
          <AllergenFilterModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            allergens={allergens}
            onAllergenChange={setAllergens}
          />
        </main>
        <footer className="absolute bottom-0 left-0 w-full p-4 text-sm text-center border-t text-zinc-500 border-zinc-300 dark:border-zinc-700">
          <p>{`Latest built: ${new Date(props.data.updated).toLocaleString(
            "en-US",
            { timeZone: "America/Los_Angeles" }
          )}`}</p>
          <p>
            Available at{" "}
            <a
              className="underline cursor-pointer"
              href="https://github.com/anonymaew/ucsc-dining-menu"
            >
              GitHub
            </a>
          </p>
          <p>
            {`© ${new Date().getFullYear()} `}
            <a className="underline cursor-pointer" href="https://napatsc.com">
              Napat Srichan
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const data = await diningList();

  return {
    props: {
      data,
    },
  };
};

export default Page;
