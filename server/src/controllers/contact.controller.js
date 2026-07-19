import ContactRequest from "../models/ContactRequest.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createContactRequest = async (req, res, next) => {
    try {
        const {
            subject,
            fullName,
            email,
            phone,
            companyName,
            serviceNeeded,
            budgetRange,
            message,
            source
        } = req.body;

        const normalizedFullName = fullName?.trim();
        const normalizedEmail = email?.trim().toLowerCase();
        const normalizedService = serviceNeeded?.trim();
        const normalizedMessage = message?.trim();

        if (!normalizedFullName || !normalizedEmail || !normalizedService || !normalizedMessage) {
            return res.status(400).json({
                message: "Full name, email, service needed, and message are required"
            });
        }

        if (!emailPattern.test(normalizedEmail)) {
            return res.status(400).json({ message: "Enter a valid email address" });
        }

        if (normalizedMessage.length < 20) {
            return res.status(400).json({ message: "Message must be at least 20 characters long" });
        }

        const contactRequest = await ContactRequest.create({
            subject: subject?.trim() || [normalizedService, companyName?.trim()].filter(Boolean).join(" • ") || "Contact request",
            fullName: normalizedFullName,
            email: normalizedEmail,
            phone: phone?.trim(),
            companyName: companyName?.trim(),
            serviceNeeded: normalizedService,
            budgetRange: budgetRange?.trim(),
            message: normalizedMessage,
            source: source?.trim() || "contact-page"
        });

        return res.status(201).json({ contactRequest });
    } catch (error) {
        return next(error);
    }
};

export const listContactRequests = async (_req, res, next) => {
    try {
        const contactRequests = await ContactRequest.find()
            .populate("respondedBy", "name email")
            .sort({ createdAt: -1 });
        return res.json({ contactRequests });
    } catch (error) {
        return next(error);
    }
};

export const respondToContactRequest = async (req, res, next) => {
    try {
        const { response } = req.body;
        if (!response?.trim()) {
            return res.status(400).json({ message: "Response is required" });
        }

        const contactRequest = await ContactRequest.findById(req.params.id);
        if (!contactRequest) {
            return res.status(404).json({ message: "Contact request not found" });
        }

        contactRequest.response = response.trim();
        contactRequest.respondedBy = req.user?.id;
        contactRequest.status = "responded";
        await contactRequest.save();

        return res.json({ contactRequest });
    } catch (error) {
        return next(error);
    }
};

export const deleteContactRequest = async (req, res, next) => {
    try {
        const contactRequest = await ContactRequest.findByIdAndDelete(req.params.id);
        if (!contactRequest) {
            return res.status(404).json({ message: "Contact request not found" });
        }

        return res.json({ message: "Contact request deleted" });
    } catch (error) {
        return next(error);
    }
};
