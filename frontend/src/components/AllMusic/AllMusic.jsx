import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { HomeContext } from "../Context/HomeContext";

const AllMusic = () => {
  const { allSong, error, loading } = useContext(HomeContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return <h1 className="text-red-500 text-center py-10">{error}</h1>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center px-4 py-8 space-y-8 min-h-screen text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-300 text-center">
        Explore All Songs
      </h1>

      {/* All Songs Section */}
      <div className="bg-gray-900/[0.6] p-6 rounded-xl shadow-xl w-full max-w-7xl">
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-200 mb-5">
          Available Tracks
        </h2>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
          {allSong.map((music) => (
            <div
              onClick={() => navigate(`/song/${music.id}/${music.name}`)}
              key={music.id}
              className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 p-4 rounded-lg shadow-lg cursor-pointer group"
            >
              <img
                src={music.coverURL}
                alt={music.name}
                className="w-full h-40 object-cover rounded-lg mb-4 shadow-md"
              />
              <h3 className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors duration-200">
                {music.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMusic;
