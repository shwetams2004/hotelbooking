import { useState } from 'react';
import { format } from 'date-fns';

interface DateRangePickerProps {
  onDateChange: (checkIn: string, checkOut: string) => void;
}

function DateRangePicker({ onDateChange }: DateRangePickerProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleCheckInChange = (date: string) => {
    setCheckIn(date);
    if (checkOut) {
      onDateChange(date, checkOut);
    }
  };

  const handleCheckOutChange = (date: string) => {
    setCheckOut(date);
    if (checkIn) {
      onDateChange(checkIn, date);
    }
  };

  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="check-in" className="block text-sm font-medium text-gray-700">
          Check-in Date
        </label>
        <input
          type="date"
          id="check-in"
          min={today}
          value={checkIn}
          onChange={(e) => handleCheckInChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="check-out" className="block text-sm font-medium text-gray-700">
          Check-out Date
        </label>
        <input
          type="date"
          id="check-out"
          min={checkIn || today}
          value={checkOut}
          onChange={(e) => handleCheckOutChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
