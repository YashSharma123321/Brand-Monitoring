import { useState, useEffect } from "react";

export default function Sidebar({ brands, selectBrand, removeBrand }) {
  const [visibleBrands, setVisibleBrands] = useState(brands);

  // Keep visibleBrands in sync when brands prop changes
  useEffect(() => {
    setVisibleBrands(brands);
  }, [brands]);

  const removeFromSidebar = (id) => {
    // Remove brand only from sidebar view
    setVisibleBrands((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="w-64 bg-white p-4 border-r h-screen flex flex-col">
      <h2 className="font-bold text-lg mb-4 text-gray-700">Your Brands</h2>
      <ul className="space-y-2 overflow-y-auto max-h-[80vh] pr-1">
        {visibleBrands.map((brand) => (
          <li
            key={brand._id}
            className="flex justify-between items-center cursor-pointer p-3 hover:bg-indigo-50 rounded-xl shadow-sm transition-all duration-200"
          >
            <span
              onClick={() => selectBrand(brand)}
              className="text-gray-800 font-medium truncate"
              title={brand.name}
            >
              {brand.name}
            </span>
            <button
              onClick={() => removeFromSidebar(brand._id)}
              className="text-red-500 font-bold hover:text-red-700 rounded-full p-1 hover:bg-red-100 transition"
              title="Remove brand"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Optional: add a "Add Brand" quick button at the bottom */}
      <div className="mt-auto pt-4">
        <button
          onClick={() => alert("Use the Add Brand bar above!")}
          className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 shadow-md transition-all duration-200"
        >
          + Add Brand
        </button>
      </div>
    </div>
  );
}
