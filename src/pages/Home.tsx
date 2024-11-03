function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to LuxStay Hotels
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Experience luxury and comfort at its finest
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Luxury Rooms</h2>
          <p className="text-gray-600">
            Spacious rooms with premium amenities
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Fine Dining</h2>
          <p className="text-gray-600">
            World-class restaurants and cuisine
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Premium Service</h2>
          <p className="text-gray-600">
            24/7 concierge and room service
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
