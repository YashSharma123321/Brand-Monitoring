export default function BrandCard({ brand, removeBrand }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all relative border border-gray-100">
      <h3 className="font-semibold text-lg text-gray-800">{brand.name}</h3>
      <button
        onClick={() => removeBrand(brand._id)}
        className="absolute top-3 right-3 text-red-500 font-bold hover:text-red-700 text-xl"
      >
        ✕
      </button>
    </div>
  );
}
