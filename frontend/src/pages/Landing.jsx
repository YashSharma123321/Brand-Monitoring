import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white px-4">
      <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg text-center">
        Welcome to Brand Monitoring App
      </h1>
      <p className="text-xl mb-10 max-w-2xl text-center text-white/90 leading-relaxed">
        Track your brand mentions, get alerts, analyze sentiment, and stay ahead of your competition with a sleek and modern dashboard.
      </p>
      <div className="flex gap-6">
        <button
          className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
