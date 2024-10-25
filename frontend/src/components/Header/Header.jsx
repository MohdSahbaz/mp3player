import { Outlet, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-gradient-to-br from-gray-800 via-gray-900 to-black py-2 px-4 md:px-10 shadow-lg text-white flex items-center justify-between sticky top-0 z-10 border-b border-gray-700">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <IoMdMenu className="text-2xl cursor-pointer hover:text-gray-300 transition" />
          <img
            onClick={() => navigate(`/`)}
            className="w-10 h-10 rounded-full cursor-pointer shadow-lg transform hover:scale-105 transition-transform"
            src="https://static.vecteezy.com/system/resources/previews/047/939/397/large_2x/illustration-of-headphone-vector.jpg"
            alt="Solker Logo"
          />
          <h1
            className="text-2xl font-semibold cursor-pointer hover:text-teal-400 transition"
            onClick={() => navigate(`/`)}
          >
            Solker
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-sm mx-4">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search music..."
            className="w-full px-4 py-2 text-sm text-gray-300 bg-gray-800 rounded-lg placeholder-gray-500 ring-1 ring-gray-600 focus:ring-teal-400 outline-none transition duration-150 ease-in-out"
          />
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
