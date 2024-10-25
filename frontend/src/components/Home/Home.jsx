import { Outlet, useNavigate } from "react-router-dom";
import { HomeContext } from "../Context/HomeContext";
import { useContext } from "react";

const Home = () => {
  const { newSong, error, loading, recommendedMusic } = useContext(HomeContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen px-6 py-8 text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold tracking-wide">
          Discover Your Next Favorite Song at Solker Music
        </h1>

        {/* New Music Section */}
        <section className="bg-gray-800 rounded-lg shadow-md p-5 space-y-4">
          <header className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-semibold">
              Fresh New Tracks
            </h2>
            <button
              onClick={() => navigate("/song")}
              className="bg-teal-500 hover:bg-teal-400 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              See All
            </button>
          </header>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {newSong.map((music) => (
              <div
                key={music.id}
                onClick={() => navigate(`/song/${music.id}/${music.name}`)}
                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition cursor-pointer text-center"
              >
                <img
                  src={music.coverURL}
                  alt={music.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-medium truncate">{music.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Music Section */}
        <section className="bg-gray-800 rounded-lg shadow-md p-5 space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold">
            Recommended for You
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedMusic.map((music) => (
              <div
                key={music.id}
                onClick={() => navigate(`/song/${music.id}/${music.name}`)}
                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition cursor-pointer text-center"
              >
                <img
                  src={music.coverURL}
                  alt={music.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-medium truncate">{music.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
