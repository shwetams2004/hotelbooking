import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            LuxStay Hotels
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/rooms" className="text-gray-600 hover:text-gray-900">
              Rooms
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
