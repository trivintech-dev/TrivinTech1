import SiteSetting from "../models/SiteSetting.js";

const getOrCreateSettings = async () => {
  let settings = await SiteSetting.findOne({ key: "global" });
  if (!settings) {
    settings = await SiteSetting.create({ key: "global" });
  }
  return settings;
};

export const getSettings = async (_req, res, next) => {
  try {
    const settings = await getOrCreateSettings();
    return res.json({ settings });
  } catch (error) {
    return next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const payload = { ...req.body, updatedBy: req.user?.id };
    delete payload._id;
    delete payload.key;

    const settings = await SiteSetting.findOneAndUpdate(
      { key: "global" },
      { $set: payload },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json({ settings });
  } catch (error) {
    return next(error);
  }
};
