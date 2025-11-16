import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchAddBar from "../components/SearchAddBar";
import BrandCard from "../components/BrandCard";
import BrandPieChart from "../components/BrandPieChart";
import Mentions from "../components/Mentions";
import Alerts from "../components/Alerts";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext.jsx";
import SentimentSummary from "../components/SentimentSummary";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [brands, setBrands] = useState([]);
  const [brandDetails, setBrandDetails] = useState([]);

  const fetchBrands = async () => {
    try {
      const res = await api.get("/brands");
      setBrands(res.data.brands);
    } catch (err) {
      console.error(err);
    }
  };

  const addBrand = async (name) => {
    try {
      const res = await api.post("/brands/add", { name });
      setBrands([...brands, res.data.brand]);
    } catch (err) {
      alert(err.response?.data?.message || "Error adding brand");
    }
  };

  const selectBrand = async (brand) => {
    let mentions = [];
    try {
      const res = await api.get(`/brands/${brand._id}/mentions`);
      mentions = res.data.mentions;
    } catch (err) {
      console.error(err);
      mentions = [];
    }

    const brandWithMentions = { ...brand, mentions };

    setBrandDetails((prev) => [
      ...prev.filter((b) => b._id !== brand._id),
      brandWithMentions,
    ]);
  };

  const removeBrandDetail = (id) => {
    setBrandDetails((prev) => prev.filter((b) => b._id !== id));
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar user={user} logout={logout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar brands={brands} selectBrand={selectBrand} />
        <div className="flex-1 p-6 overflow-y-auto">
          <SearchAddBar addBrand={addBrand} />

          <div className="space-y-8">
            {brandDetails.map((brand) => {
              const mentions = brand.mentions || [];

              return (
                <div
                  key={brand._id}
                  className="bg-white p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <BrandCard brand={brand} removeBrand={removeBrandDetail} />

                  <div className="flex flex-col md:flex-row gap-6 mt-6">
                    {/* Left Column: Pie Chart, Sentiment, Alerts */}
                    <div className="w-full md:w-1/3 flex flex-col gap-5">
                      <div className="bg-white p-5 rounded-2xl shadow-md flex justify-center items-center transition hover:scale-105">
                        <BrandPieChart mentions={mentions} />
                      </div>

                      <div className="bg-gray-50 p-4 rounded-2xl shadow-sm">
                        <SentimentSummary mentions={mentions} />
                      </div>

                      <div className="mt-4">
                        <Alerts brand={brand} />
                      </div>
                    </div>

                    {/* Right Column: Mentions */}
                    <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-xl p-2">
                      <Mentions brand={brand} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
