import { useState } from 'react';
import { Booking } from '../types/Booking';
import DateRangePicker from './DateRangePicker';

interface BookingFormProps {
  roomId: number;
  onSubmit: (booking: Booking) => Promise<void>;
}

function BookingForm({ roomId, onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    check_in: '',
    check_out: '',
  });

  const handleDateChange = (checkIn: string, checkOut: string) => {
    setFormData(prev => ({
      ...prev,
      check_in: checkIn,
      check_out: checkOut,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      room_id: roomId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="guest_name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="guest_name"
          required
          value={formData.guest_name}
          onChange={(e) => setFormData(prev => ({ ...prev, guest_name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <DateRangePicker onDateChange={handleDateChange} />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Book Now
      </button>
    </form>
  );
}
