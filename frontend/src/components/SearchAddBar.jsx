import { useState } from "react";

export default function SearchAddBar({ addBrand }) {
  const [brandName, setBrandName] = useState("");

  const handleAdd = () => {
    if (brandName.trim() === "") return;
    addBrand(brandName);
    setBrandName("");
  };

  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Add a new brand..."
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        className="flex-1 border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder-gray-400 text-gray-800"
      />
      <button
        onClick={handleAdd}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition transform hover:scale-105"
      >
        Add
      </button>
    </div>
  );
}
