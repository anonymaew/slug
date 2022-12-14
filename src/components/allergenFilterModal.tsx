import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import { Dialog, Switch } from '@headlessui/react';

import { AllergenFilter } from '../interfaces/allergenFilter';

const AllergenFilter = (props: {
  data: AllergenFilter;
  onAllergenChange: Dispatch<SetStateAction<AllergenFilter[]>>;
}) => {
  return (
    <div className="flex items-center justify-between my-1">
      <span className="flex items-center pl-3">
        <Image
          width={20}
          height={20}
          src={`/allergen-icons/${props.data.name}.gif`}
          alt={`${props.data.name} icon`}
        />
        <span className="ml-3">
          {props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1)}
        </span>
      </span>
      <Switch
        checked={props.data.checked}
        onChange={(value: boolean) =>
          props.onAllergenChange((prev) => {
            const newAllergens = [...prev];
            const index = newAllergens.findIndex(
              (allergen) => allergen.name === props.data.name
            );
            newAllergens[index].checked = value;
            return newAllergens;
          })
        }
        className={`${
          props.data.checked ? "bg-amber-500" : "bg-zinc-200 dark:bg-zinc-700"
        } relative inline-flex items-center h-6 rounded-full w-11 transition duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus:outline-offset-2 focus:outline-amber-500`}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={`${
            props.data.checked ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

const AllergenFilterModal = (props: {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  allergens: AllergenFilter[];
  onAllergenChange: Dispatch<SetStateAction<AllergenFilter[]>>;
}) => {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto text-black dark:text-zinc-100"
      open={props.modalOpen}
      onClose={() => props.setModalOpen(false)}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block w-full max-w-xs p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl dark:bg-zinc-800 rounded-2xl">
          <Dialog.Title as="h2" className="text-xl font-bold leading-6">
            Allergen Filter
          </Dialog.Title>

          <div className="my-4">
            <h3 className="text-lg border-b border-zinc-300 dark:border-zinc-700">
              Preference
            </h3>
            <p className="text-sm text-zinc-500">
              Only includes menu with the preference
            </p>
            {props.allergens
              .filter((allergen) => allergen.type === "Preference")
              .map((allergen, allergenIndex) => {
                return (
                  <AllergenFilter
                    key={allergenIndex}
                    data={allergen}
                    onAllergenChange={props.onAllergenChange}
                  />
                );
              })}
          </div>
          <div className="mt-4">
            <h3 className="text-lg border-b border-zinc-300 dark:border-zinc-700">
              Allergen
            </h3>
            <p className="text-sm text-zinc-500">
              Filter out menu with the allergen
            </p>
            {props.allergens
              .filter((allergen) => allergen.type === "Allergy")
              .map((allergen, allergenIndex) => {
                return (
                  <AllergenFilter
                    key={allergenIndex}
                    data={allergen}
                    onAllergenChange={props.onAllergenChange}
                  />
                );
              })}
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md dark:text-black bg-amber-900 dark:hover:bg-amber-200 dark:bg-amber-100 hover:bg-amber-800 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              onClick={() => props.setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AllergenFilterModal;
