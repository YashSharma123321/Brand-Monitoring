import axios from "axios";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

const NEWS_API_KEY = "0ae64a3f13e046b29e5a6c1a65eb3015";

export const fetchNewsMentions = async (brand) => {
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(brand)}&sortBy=publishedAt&language=en&pageSize=5&apiKey=${NEWS_API_KEY}`;
    const res = await axios.get(url);

    const articles = res.data.articles.map(article => {
      const result = sentiment.analyze(article.title);
      let sentimentLabel = "neutral";
      if (result.score > 0) sentimentLabel = "positive";
      else if (result.score < 0) sentimentLabel = "negative";

      return {
        source: "News",
        text: article.title,
        sentiment: sentimentLabel,
        link: article.url
      };
    });

    return articles;
  } catch (err) {
    console.error(err);
    return [];
  }
};
