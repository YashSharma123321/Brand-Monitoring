import { useState, useEffect } from "react";
import api from "../services/api.js";

export default function Mentions({ brand }) {
  const [mentions, setMentions] = useState([]);

  const fetchMentions = async () => {
    try {
      const res = await api.get(`/brands/${brand._id}/mentions`);
      setMentions(res.data.mentions);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching mentions");
    }
  };

  useEffect(() => {
    if (brand) fetchMentions();
  }, [brand]);

  const getSentimentColor = (sentiment) => {
    if (sentiment === "positive") return "text-green-600";
    if (sentiment === "negative") return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <h3 className="font-bold text-xl mb-4 border-b pb-2 text-gray-800">
        Mentions
      </h3>
      <ul className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {mentions.length > 0 ? (
          mentions.map((m) => (
            <li
              key={m._id}
              className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition transform hover:-translate-y-0.5"
            >
              <a
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline text-indigo-600 hover:text-indigo-800 transition"
              >
                {m.source}
              </a>{" "}
              - <span className={getSentimentColor(m.sentiment)}>{m.sentiment}</span>
              <p className="text-sm mt-1 text-gray-700">{m.text}</p>
              {m.topic && <span className="text-xs text-gray-400">Topic: {m.topic}</span>}
            </li>
          ))
        ) : (
          <li className="text-gray-400 text-sm text-center py-4">
            No mentions found
          </li>
        )}
      </ul>
    </div>
  );
}
