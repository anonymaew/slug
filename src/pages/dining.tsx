import Head from 'next/head';
import { useState } from 'react';

import AllergenFilterModal from '../components/allergenFilterModal';
import DiningMenu from '../components/diningMenu';
import DiningSelector from '../components/diningSelector';
import { AllergenFilter, DefaultAllergens } from '../interfaces/allergenFilter';
import { DiningLists, Location } from '../interfaces/diningList';
import MainLayout from '../layouts/main';
import diningList from '../lib/diningLists';

const Page = (props: { data: DiningLists }) => {
  const [day, setDay] = useState<string>("Today");
  const [location, setLocation] = useState<Location>(props.data.locations[0]);
  const [allergens, setAllergens] =
    useState<AllergenFilter[]>(DefaultAllergens);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <MainLayout>
      <DiningSelector
        data={props.data}
        location={location}
        setLocation={setLocation}
      />
      <div className="flex justify-between px-4 mt-4 text-base font-bold sm:text-lg text-amber-900 dark:text-amber-100">
        <span>
          {location.days.find((dayItem) => dayItem.name === day)?.date || ""}
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
      <p>{`Latest built: ${new Date(props.data.updated).toLocaleString(
        "en-US",
        { timeZone: "America/Los_Angeles" }
      )}`}</p>
    </MainLayout>
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
