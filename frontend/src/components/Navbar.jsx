export default function Navbar({ user, logout }) {
  return (
    <div className="flex justify-between items-center bg-white shadow-lg px-8 py-4 sticky top-0 z-50">
      <h1 className="text-2xl font-extrabold text-indigo-600 tracking-wide">
        Brand Monitoring Dashboard
      </h1>
      <div className="flex items-center gap-5">
        <span className="font-medium text-gray-800">
          {user?.name || "Guest"}
        </span>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
