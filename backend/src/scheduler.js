import cron from "node-cron";
import Brand from "./models/Brand.js";
import Mention from "./models/Mention.js";
import { fetchRedditMentions } from "./services/mentionService.js";
import { fetchNewsMentions } from "./services/newsService.js";
import { clusterMentions } from "./utils/topicClustering.js";
import { detectSpikes } from "./utils/spikeDetection.js";

export const fetchMentionsForAllBrands = async () => {
  try {
    const brands = await Brand.find({});
    for (let brand of brands) {
      const redditMentions = await fetchRedditMentions(brand.name);
      const newsMentions = await fetchNewsMentions(brand.name);
      const allMentions = [...redditMentions, ...newsMentions];

      if (allMentions.length > 0) {
        const clusteredMentions = clusterMentions(allMentions, 3);

        for (let m of clusteredMentions) {
          const exists = await Mention.findOne({ text: m.text, brand: brand._id });
          if (!exists) {
            await Mention.create({ brand: brand._id, ...m });
          }
        }
      }

      // Detect spikes after saving mentions
      await detectSpikes(brand);

      console.log(`Fetched ${allMentions.length} mentions for brand: ${brand.name}`);
    }
  } catch (err) {
    console.error("Error fetching mentions:", err);
  }
};

// Run every 15 minutes
cron.schedule("*/15 * * * *", () => {
  console.log("Running scheduled mention fetch...");
  fetchMentionsForAllBrands();
});
