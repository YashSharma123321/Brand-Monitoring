import { fetchRedditMentions } from "../services/mentionService.js";
import { fetchNewsMentions } from "../services/newsService.js";
import Brand from "../models/Brand.js";
import Mention from "../models/Mention.js";
import User from "../models/User.js";

// Add a brand
export const addBrand = async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ message: "Brand name and userId are required" });
    }

    // ✅ Verify user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 1️⃣ Save brand to MongoDB
    const brand = await Brand.create({
      name,
      user: user._id, // link brand to user
    });

    // 2️⃣ Fetch mentions from Reddit & News
    const redditMentions = await fetchRedditMentions(name);
    const newsMentions = await fetchNewsMentions(name);
    const allMentions = [...redditMentions, ...newsMentions];

    // 3️⃣ Save mentions to MongoDB
    const savedMentions = [];
    for (let mention of allMentions) {
      const newMention = await Mention.create({
        brand: brand._id,
        source: mention.source,
        text: mention.text,
        sentiment: mention.sentiment,
        link: mention.link,
      });
      savedMentions.push(newMention);
    }

    res.status(201).json({ message: "Brand added", brand, mentions: savedMentions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all mentions for a brand
export const getMentions = async (req, res) => {
  try {
    const { brandId } = req.params;

    // ✅ Check brand exists
    const brand = await Brand.findById(brandId);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    const mentions = await Mention.find({ brand: brandId });

    res.status(200).json({ brandId, mentions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
