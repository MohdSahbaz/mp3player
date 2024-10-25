import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../Context/HomeContext";
import axios from "axios";

const SingleMusic = () => {
  const { error, loading, recommendedMusic } = useContext(HomeContext);
  const { id, name } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [coverURL, setCoverURL] = useState("");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/song/${id}`
        );
        const data = response.data;
        const audioObject = new Audio(data.songUrl);
        setAudio(audioObject);
        setCoverURL(data.coverURL);
      } catch (err) {
        console.log("Error while fetching song");
      }
    };
    fetchSong();
  }, [id]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("loadedmetadata", () =>
        setDuration(audio.duration)
      );
      audio.addEventListener("timeupdate", () =>
        setCurrentTime(audio.currentTime)
      );

      return () => {
        audio.removeEventListener("loadedmetadata", () => {});
        audio.removeEventListener("timeupdate", () => {});
      };
    }
  }, [audio]);

  const togglePlayPause = () => {
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (event) => {
    const { offsetX, currentTarget } = event.nativeEvent;
    const progressBarWidth = currentTarget.offsetWidth;
    const newTime = (offsetX / progressBarWidth) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  if (error) return <h1 className="text-red-500 text-center py-10">{error}</h1>;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col px-4 py-8 min-h-screen text-white">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-white bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400 my-4">
        Now Playing: {name}
      </h1>

      {/* Music Player */}
      <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col items-center space-y-6">
        {coverURL && (
          <img
            src={coverURL}
            alt={`${name} Cover`}
            className="w-48 h-48 object-cover rounded-lg shadow-lg"
          />
        )}

        <div className="w-full">
          <div
            className="relative w-full bg-gray-700 h-3 rounded-full overflow-hidden cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="absolute top-0 left-0 h-3 bg-indigo-500 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-300 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={() => {
              audio.currentTime = 0;
              setCurrentTime(0);
            }}
            className="text-2xl text-white"
          >
            ⏮
          </button>

          <button onClick={togglePlayPause} className="text-3xl text-white">
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          <button
            onClick={() => {
              const newTime = audio.currentTime + 10;
              audio.currentTime = newTime <= duration ? newTime : duration;
              setCurrentTime(audio.currentTime);
            }}
            className="text-2xl text-white"
          >
            ⏭
          </button>
        </div>
      </div>

      {/* Recommended Music */}
      <div className="bg-gray-900/50 backdrop-blur-md p-6 mt-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
          Recommended Music
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {recommendedMusic.map((music) => (
            <a
              href={`/song/${music.id}/${music.name}`}
              key={music.id}
              className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition transform hover:scale-105"
            >
              <img
                src={music.coverURL}
                alt={music.name}
                className="w-28 h-28 object-cover rounded-md mb-2 shadow-md"
              />
              <h3 className="text-lg font-medium text-white">{music.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleMusic;
