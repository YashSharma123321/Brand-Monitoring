import { useState, useEffect } from "react";
import api from "../services/api.js";

export default function Alerts({ brand }) {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    try {
      const res = await api.get(`/brands/${brand._id}/alerts`);
      setAlerts(res.data.alerts);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching alerts");
    }
  };

  useEffect(() => {
    if (brand) fetchAlerts();
  }, [brand]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mt-4 border border-gray-100">
      <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b border-gray-200 pb-2">
        Alerts
      </h3>
      <ul className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-gray-100">
        {alerts.map((a) => (
          <li
            key={a._id}
            className="p-3 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-shadow shadow-sm"
          >
            {a.message}
          </li>
        ))}
        {alerts.length === 0 && (
          <li className="text-gray-400 text-sm text-center">No alerts found</li>
        )}
      </ul>
    </div>
  );
}
