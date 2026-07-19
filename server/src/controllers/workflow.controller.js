import WorkflowStep from "../models/WorkflowStep.js";

export const listWorkflowSteps = async (req, res, next) => {
    try {
        const filter = req.query.all === "true" ? {} : { isActive: true };
        const workflowSteps = await WorkflowStep.find(filter).sort({ order: 1, createdAt: 1 });
        return res.json({ workflowSteps });
    } catch (error) {
        return next(error);
    }
};

export const getWorkflowStep = async (req, res, next) => {
    try {
        const workflowStep = await WorkflowStep.findById(req.params.id);
        if (!workflowStep) {
            return res.status(404).json({ message: "Workflow step not found" });
        }

        return res.json({ workflowStep });
    } catch (error) {
        return next(error);
    }
};

export const createWorkflowStep = async (req, res, next) => {
    try {
        const workflowStep = await WorkflowStep.create({ ...req.body, createdBy: req.user.id });
        return res.status(201).json({ workflowStep });
    } catch (error) {
        return next(error);
    }
};

export const updateWorkflowStep = async (req, res, next) => {
    try {
        const workflowStep = await WorkflowStep.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        if (!workflowStep) {
            return res.status(404).json({ message: "Workflow step not found" });
        }

        return res.json({ workflowStep });
    } catch (error) {
        return next(error);
    }
};

export const deleteWorkflowStep = async (req, res, next) => {
    try {
        const workflowStep = await WorkflowStep.findByIdAndDelete(req.params.id);
        if (!workflowStep) {
            return res.status(404).json({ message: "Workflow step not found" });
        }

        return res.json({ message: "Workflow step deleted" });
    } catch (error) {
        return next(error);
    }
};