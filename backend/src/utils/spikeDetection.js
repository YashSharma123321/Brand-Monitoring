import Mention from "../models/Mention.js";
import Alert from "../models/Alert.js";

export const detectSpikes = async (brand) => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const mentionsLastHour = await Mention.find({ brand: brand._id, createdAt: { $gte: oneHourAgo } });
  
  // Calculate average mentions per hour in past 24 hours
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const mentionsLastDay = await Mention.find({ brand: brand._id, createdAt: { $gte: oneDayAgo } });
  const avgPerHour = mentionsLastDay.length / 24;

  if (mentionsLastHour.length > 2 * avgPerHour && mentionsLastHour.length > 2) {
    const message = `Spike detected for ${brand.name}: ${mentionsLastHour.length} mentions in last hour`;
    await Alert.create({ brand: brand._id, message, mentionsCount: mentionsLastHour.length });
    console.log(message);
  }
};
