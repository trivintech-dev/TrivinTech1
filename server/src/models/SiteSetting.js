import mongoose from "mongoose";

const siteSettingSchema = new mongoose.Schema(
  {
    key: { type: String, default: "global", unique: true },
    brand: {
      name: { type: String, default: "TRIVIN" },
      tagline: { type: String, default: "" },
      logoUrl: { type: String, default: "" }
    },
    contact: {
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
      investorEmail: { type: String, default: "" },
      address: { type: String, default: "" },
      workingHours: { type: String, default: "" },
      mapEmbedUrl: { type: String, default: "" }
    },
    socials: {
      type: [
        {
          platform: { type: String, trim: true },
          label: { type: String, trim: true },
          href: { type: String, trim: true }
        }
      ],
      default: []
    },
    nav: {
      type: [
        {
          label: { type: String, trim: true },
          to: { type: String, trim: true }
        }
      ],
      default: []
    },
    footer: { type: mongoose.Schema.Types.Mixed, default: {} },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model("SiteSetting", siteSettingSchema);
