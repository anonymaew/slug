import Head from 'next/head';
import { useState } from 'react';

import AllergenFilterModal from '../components/allergenFilterModal';
import DiningMenu from '../components/diningMenu';
import Selectors from '../components/selectors';
import { AllergenFilter, DefaultAllergens } from '../interfaces/allergenFilter';
import { DiningLists, Location } from '../interfaces/diningList';
import diningList from '../lib/diningLists';

const Page = (props: { data: DiningLists; built: string }) => {
  const [day, setDay] = useState<string>("Today");
  const [location, setLocation] = useState<Location>(props.data.locations[0]);
  const [allergens, setAllergens] =
    useState<AllergenFilter[]>(DefaultAllergens);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="max-w-xl p-2 mx-auto">
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
      <main className="min-h-screen my-4 text-sm sm:text-base">
        <button
          className="px-2 font-bold underline transition duration-200 ease-in-out rounded-full text-amber-900 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-500 w-fit"
          onClick={() => setModalOpen(true)}
        >
          Allergen filter
        </button>
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

      <footer className="text-sm text-gray-600">
        <p>Last updated:{props.data.updated}</p>
        <p>Last built:{props.built}</p>
      </footer>
    </div>
  );
};

export const getStaticProps = async () => {
  const data = await diningList();

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
