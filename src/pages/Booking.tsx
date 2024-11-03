import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Room } from '../types/Room';
import { Booking } from '../types/Booking';
import BookingForm from '../components/BookingForm';

function BookingPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/rooms/${roomId}`);
        setRoom(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch room details. Please try again later.');
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleBooking = async (bookingData: Booking) => {
    try {
      await axios.post('http://localhost:3000/api/bookings', bookingData);
      setBookingSuccess(true);
      setTimeout(() => {
        navigate('/rooms');
      }, 3000);
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="text-center">
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
          Booking successful! Redirecting to rooms page...
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center text-red-600 p-4">
        Room not found
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Book {room.name}</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <img 
          src={room.image_url} 
          alt={room.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{room.name}</h2>
          <p className="text-gray-600 mb-4">{room.description}</p>
          <p className="text-lg font-bold text-gray-900">${room.price.toFixed(2)}/night</p>
        </div>
        <BookingForm roomId={room.id} onSubmit={handleBooking} />
      </div>
    </div>
  );
}

export default BookingPage;
