import { useEffect, useState } from 'react';

import { CalendarIcon } from '@heroicons/react/24/solid';

import AllergenFilterModal from '../components/allergenFilterModal';
import Calendar from '../components/calendar';
import DiningMenu from '../components/diningMenu';
import DiningSelector from '../components/diningSelector';
import { AllergenFilter, DefaultAllergens } from '../interfaces/allergenFilter';
import { DiningLists, Meal } from '../interfaces/diningList';
import MainLayout from '../layouts/main';
import getDiningList from '../lib/getDiningList';

const Page = (props: { data: DiningLists }) => {
  const [diningList, setDiningList] = useState<DiningLists>(props.data);
  const [location, setLocation] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [meals, setMeals] = useState<Meal[]>(props.data.locations[0].meals);
  const [allergens, setAllergens] =
    useState<AllergenFilter[]>(DefaultAllergens);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setMeals(diningList.locations[location].meals);
  }, [diningList, location]);

  useEffect(() => {
    if (date.toDateString() === new Date().toDateString())
      setDiningList(props.data);
    else
      (async () => {
        setLoading(true);
        const result = await fetch(`/api/dining/list?date=${date.getTime()}`);
        const data = await result.json();
        setDiningList(data);
        setLoading(false);
      })();
  }, [date, props.data]);

  return (
    <MainLayout>
      <DiningSelector
        data={props.data}
        location={location}
        setLocation={setLocation}
        setModalOpen={setModalOpen}
        date={date}
        setDate={setDate}
        allergens={allergens}
      />
      <div className="flex justify-between px-4 mt-4 text-base font-bold sm:text-lg text-amber-900 dark:text-amber-100"></div>
      <DiningMenu meals={meals} filters={allergens} loading={loading} />
      <AllergenFilterModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        allergens={allergens}
        onAllergenChange={setAllergens}
      />
    </MainLayout>
  );
};

export const getStaticProps = async () => {
  const data = await getDiningList();

  return {
    props: {
      data,
    },
  };
};

export default Page;
