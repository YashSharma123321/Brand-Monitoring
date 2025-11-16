import axios from "axios";
import Sentiment from "sentiment";

const sentiment = new Sentiment();
const NEWS_API_KEY = process.env.NEWS_API_KEY;

export const fetchNewsMentions = async (brand) => {
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(brand)}&sortBy=publishedAt&language=en&pageSize=5&apiKey=${NEWS_API_KEY}`;
    const res = await axios.get(url);

    return res.data.articles.map(article => {
      const score = sentiment.analyze(article.title).score;
      const sentimentLabel = score > 0 ? "positive" : score < 0 ? "negative" : "neutral";
      return { source: "News", text: article.title, sentiment: sentimentLabel, link: article.url };
    });
  } catch {
    return [];
  }
};
