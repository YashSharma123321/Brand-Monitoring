import axios from "axios";
import Sentiment from "sentiment";
import Mention from "../models/Mention.js";

const sentiment = new Sentiment();

export const fetchRedditMentions = async (brand) => {
  try {
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(brand)}&limit=5`;
    const res = await axios.get(url);

    const posts = res.data.data.children.map(post => {
      const text = post.data.title;
      const result = sentiment.analyze(text);
      let sentimentLabel = "neutral";
      if (result.score > 0) sentimentLabel = "positive";
      else if (result.score < 0) sentimentLabel = "negative";

      return {
        source: "Reddit",
        text,
        sentiment: sentimentLabel,
        link: `https://reddit.com${post.data.permalink}`
      };
    });

    return posts;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const saveMentions = async (brandId, mentionsArray) => {
  const savedMentions = [];

  for (let mention of mentionsArray) {
    const newMention = await Mention.create({
      brand: brandId,
      source: mention.source,
      text: mention.text,
      sentiment: mention.sentiment,
      link: mention.link,
    });
    savedMentions.push(newMention);
  }

  return savedMentions;
};