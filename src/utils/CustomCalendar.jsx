import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({
  selectedRange = [new Date(), new Date()],
  onChange = () => {},
}) => {
  const [value, setValue] = useState(selectedRange);

  const handleChange = (date) => {
    setValue(date);
    if (typeof onChange === 'function') {
      onChange(date);
    } else {
      console.error('onChange is not a function');
    }
  };

  const isBeforeToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="w-full max-w-xl mx-auto font-sans">
      <Calendar
        onChange={handleChange}
        value={value}
        selectRange={true}
        showNeighboringMonth={false}
        tileClassName={({ date }) => {
          if (
            Array.isArray(value) &&
            value.length === 2 &&
            date >= value[0] &&
            date <= value[1]
          ) {
            if (date.getTime() === value[0].getTime()) {
              return 'bg-blue-500 text-white rounded-full';
            }
            return 'bg-blue-200 text-blue-700 rounded-lg';
          }
          return 'font-bold';
        }}
        tileDisabled={({ date }) => isBeforeToday(date)}
        className="border-none shadow-lg rounded-lg text-lg"
        formatDay={(_, date) => date.getDate().toString()}
      />
      <style>{`
        .react-calendar {
          border-radius: 0.5rem;
        }
        .react-calendar__tile {
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #000;
          font-size: 1.25rem;
        }
        .react-calendar__month-view__weekdays {
          font-weight: bold;
          color: #000;
          font-size: 1.25rem;
        }
        .react-calendar__tile--now {
          background: transparent;
          color: inherit;
        }
        .react-calendar__tile--disabled {
          display: none;
        }
        .bg-blue-500 {
          background-color: #3b82f6;
        }
        .bg-blue-200 {
          background-color: #bfdbfe;
        }
        .text-blue-700 {
          color: #1e3a8a;
        }
        .rounded-full {
          border-radius: 50%;
        }
        .rounded-lg {
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
};

export default CustomCalendar;
