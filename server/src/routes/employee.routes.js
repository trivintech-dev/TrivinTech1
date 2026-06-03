import express from "express";
import * as employeeController from "../controllers/employee.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = express.Router();

// All routes require authentication and admin role
router.use(requireAuth, requireAdmin);

// CRUD operations
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

// Filter endpoints
router.get("/designation/:designation", employeeController.getEmployeesByDesignation);
router.get("/department/:department", employeeController.getEmployeesByDepartment);

// Document management
router.post("/:id/documents/:docType", employeeController.uploadEmployeeDocument);

export default router;
