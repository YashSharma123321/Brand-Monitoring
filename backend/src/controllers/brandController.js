import Brand from "../models/Brand.js";
import Mention from "../models/Mention.js";
import Alert from "../models/Alert.js";

// Add brand
export const addBrand = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Brand name required" });

    const brand = await Brand.create({ name, user: req.user._id });
    res.status(201).json({ message: "Brand added", brand });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get brands
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ user: req.user._id });
    res.status(200).json({ brands });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get mentions
export const getMentions = async (req, res) => {
  try {
    const mentions = await Mention.find({ brand: req.params.brandId }).sort({ createdAt: -1 });
    res.status(200).json({ mentions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get alerts
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ brand: req.params.brandId }).sort({ createdAt: -1 });
    res.status(200).json({ alerts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
