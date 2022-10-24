import 'react-datepicker/dist/react-datepicker.css';

import { ButtonHTMLAttributes, Dispatch, forwardRef, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';

import { CalendarIcon } from '@heroicons/react/24/solid';

const Wrapper = forwardRef<HTMLButtonElement | null>(
  (props: ButtonHTMLAttributes<HTMLButtonElement>, ref) => (
    <button
      className="flex flex-row items-center bg-transparent rounded-md focus:outline-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
      onClick={props.onClick}
      ref={ref}
    >
      <CalendarIcon className="w-5 mr-2 aspect-square" />
      {props.value}
    </button>
  )
);

Wrapper.displayName = "Wrapper";

const Calendar = (props: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) => {
  return (
    <div className="w-52">
      <DatePicker
        dateFormat={"MMMM dd, yyyy"}
        selected={props.date}
        onChange={(date) => {
          if (date !== null) props.setDate(date);
        }}
        customInput={<Wrapper />}
      />
    </div>
  );
};

export default Calendar;
