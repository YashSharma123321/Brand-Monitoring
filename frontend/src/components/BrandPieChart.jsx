import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BrandPieChart({ mentions = [] }) {
  const counts = { positive: 0, negative: 0, neutral: 0 };
  
  mentions.forEach((m) => {
    if (m.sentiment === "positive") counts.positive += 1;
    else if (m.sentiment === "negative") counts.negative += 1;
    else counts.neutral += 1;
  });

  const chartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        data: [counts.positive, counts.negative, counts.neutral],
        backgroundColor: ["#22c55e", "#ef4444", "#facc15"],
        borderWidth: 1,
        borderColor: "#f0f0f0",
        hoverOffset: 10, // smooth hover effect
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 15,
          font: { size: 14, weight: "500" },
        },
      },
      tooltip: {
        bodyFont: { size: 14 },
        padding: 10,
        cornerRadius: 8,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all flex justify-center items-center">
      <div className="w-48 h-48">
        <Pie key={JSON.stringify(counts)} data={chartData} options={options} />
      </div>
    </div>
  );
}
