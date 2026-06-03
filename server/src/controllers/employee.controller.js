import User from "../models/User.js";
import { logActivity } from "../utils/activity.js";

// Get all employees (admin only)
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" })
      .select("-password")
      .populate("reportingManagerId", "name email designation")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      employees,
      total: employees.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single employee (admin only)
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id)
      .select("-password")
      .populate("reportingManagerId", "name email designation");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      success: true,
      employee
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create employee (admin only)
export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      designation,
      department,
      employmentType,
      reportingManagerId,
      joiningDate,
      skills,
      experience,
      education,
      employeeId
    } = req.body;

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Generate employee ID if not provided
    const finalEmployeeId = employeeId || `EMP-${Date.now()}`;

    const newEmployee = new User({
      name,
      email,
      phone,
      role: "employee",
      designation,
      department,
      employmentType,
      reportingManagerId,
      joiningDate,
      skills: skills || [],
      experience,
      education: education || [],
      employeeId: finalEmployeeId,
      accountStatus: "active"
    });

    await newEmployee.save();

    // Log activity
    await logActivity(req.user._id, "EMPLOYEE_CREATED", `Created employee: ${name}`, {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("user-agent")
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: newEmployee
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update employee (admin only)
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Prevent updating email and password
    delete updateData.email;
    delete updateData.password;
    delete updateData.role;

    const employee = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Log activity
    await logActivity(req.user._id, "EMPLOYEE_UPDATED", `Updated employee: ${employee.name}`, {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("user-agent"),
      fields: Object.keys(updateData)
    });

    res.json({
      success: true,
      message: "Employee updated successfully",
      employee
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete employee (admin only)
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await User.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Log activity
    await logActivity(req.user._id, "EMPLOYEE_DELETED", `Deleted employee: ${employee.name}`, {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("user-agent")
    });

    res.json({
      success: true,
      message: "Employee deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employees by designation
export const getEmployeesByDesignation = async (req, res) => {
  try {
    const { designation } = req.params;

    const employees = await User.find({
      role: "employee",
      designation: designation
    }).select("-password");

    res.json({
      success: true,
      employees,
      total: employees.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employees by department
export const getEmployeesByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    const employees = await User.find({
      role: "employee",
      department: department
    }).select("-password");

    res.json({
      success: true,
      employees,
      total: employees.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload employee document
export const uploadEmployeeDocument = async (req, res) => {
  try {
    const { id, docType } = req.params;
    const { url } = req.body;

    const validDocTypes = ["offerLetter", "appointmentLetter", "idCard", "ndaDocuments"];

    if (!validDocTypes.includes(docType)) {
      return res.status(400).json({ message: "Invalid document type" });
    }

    const employee = await User.findByIdAndUpdate(
      id,
      { $set: { [`documents.${docType}`]: url } },
      { new: true }
    ).select("-password");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      success: true,
      message: "Document uploaded successfully",
      employee
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
