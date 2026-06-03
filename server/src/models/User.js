import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    role: { type: String, enum: ["user", "admin", "employee"], default: "user" },
    phone: { type: String },
    avatarUrl: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other", "prefer not to say"], default: "prefer not to say" },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
    timezone: { type: String, default: "UTC" },
    language: { type: String, default: "English" },
    notificationSettings: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: false }
    },
    accountStatus: { type: String, enum: ["active", "inactive"], default: "active" },
    membershipPlan: { type: String, default: "Basic" },
    provider: { type: String, default: "local" },

    // Employee Profile Fields (Common)
    employeeId: { type: String, unique: true, sparse: true },
    designation: { type: String, enum: ["Developer", "Intern", "Manager", "UI/UX Designer", "Technical Support Executive", "HR", "Sales", "Other"], },
    department: { type: String },
    employmentType: { type: String, enum: ["Full-time", "Part-time", "Contract", "Intern"], },
    reportingManagerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    joiningDate: { type: Date },
    employmentStatus: { type: String, enum: ["Active", "On Leave", "Resigned", "Terminated"], default: "Active" },
    bloodGroup: { type: String },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    },

    // Professional Information
    skills: [{ type: String }],
    experience: { type: Number }, // in years
    certifications: [{ type: String }],
    education: [
      {
        degree: String,
        institution: String,
        year: String
      }
    ],

    // Developer Specific
    programmingLanguages: [String],
    frameworks: [String],
    databases: [String],
    cloudPlatforms: [String],
    devopsTools: [String],
    githubProfile: String,
    gitlabProfile: String,

    // Designer Specific
    designSkills: [String], // Figma, Adobe XD, etc.
    portfolioUrl: String,

    // Support Specific
    ticketsResolved: { type: Number, default: 0 },
    customerSatisfactionScore: { type: Number, default: 0 },

    // Attendance & Leave
    presentDays: { type: Number, default: 0 },
    leaveBalance: { type: Number, default: 20 },

    // Payroll
    salaryInfo: {
      baseSalary: Number,
      bonus: Number,
      currency: { type: String, default: "USD" }
    },

    // Documents (URLs)
    documents: {
      offerLetter: String,
      appointmentLetter: String,
      idCard: String,
      ndaDocuments: String,
      salarySlips: [String],
      taxDocuments: [String]
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.methods.comparePassword = async function comparePassword(password) {
  if (!this.password) {
    return false;
  }

  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
