export default function SentimentSummary({ mentions = [] }) {
  const counts = { positive: 0, negative: 0, neutral: 0 };

  mentions.forEach((m) => {
    if (m.sentiment === "positive") counts.positive += 1;
    else if (m.sentiment === "negative") counts.negative += 1;
    else counts.neutral += 1;
  });

  const badgeClasses =
    "px-3 py-1 rounded-full shadow-md text-white font-semibold flex items-center justify-center min-w-[70px]";

  return (
    <div className="flex justify-between gap-3 mt-4">
      <div className={`${badgeClasses} bg-green-500 bg-gradient-to- from-green-400 to-green-600`}>
        👍 {counts.positive}
      </div>
      <div className={`${badgeClasses} bg-red-500 bg-gradient-to-tr from-red-400 to-red-600`}>
        👎 {counts.negative}
      </div>
      <div className={`${badgeClasses} bg-yellow-400 bg-gradient-to-tr from-yellow-300 to-yellow-500 text-gray-800`}>
        😐 {counts.neutral}
      </div>
    </div>
  );
}
