import { Room } from '../types/Room';
import { Link } from 'react-router-dom';

interface RoomCardProps {
  room: Room;
}

function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={room.image_url} 
        alt={room.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name}</h3>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-gray-900">
            ${room.price.toFixed(2)}/night
          </p>
          <Link
            to={`/booking/${room.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Now
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Capacity: {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
        </p>
      </div>
    </div>
  );
}

export default RoomCard;
