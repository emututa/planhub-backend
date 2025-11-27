"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminService_1 = __importDefault(require("../services/adminService"));
const registrationService_1 = __importDefault(require("../services/registrationService"));
class AdminController {
    // 🆕 NEW: Initialize first admin
    async initFirstAdmin(req, res) {
        try {
            const result = await adminService_1.default.initFirstAdmin(req.body);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Admin login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await adminService_1.default.login(email, password);
            res.json(result);
        }
        catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
    // Admin creates another admin
    async createAdmin(req, res) {
        try {
            const adminId = req.admin?.adminId;
            if (!adminId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            const newAdmin = await adminService_1.default.createAdmin(adminId, req.body);
            res.status(201).json(newAdmin);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Get all admins
    async getAllAdmins(req, res) {
        try {
            const admins = await adminService_1.default.getAllAdmins();
            res.json(admins);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // Delete admin
    async deleteAdmin(req, res) {
        try {
            const result = await adminService_1.default.deleteAdmin(req.params.id);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Approve registration
    async approveRegistration(req, res) {
        try {
            const adminId = req.admin?.adminId;
            if (!adminId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            const result = await registrationService_1.default.approveRegistration(adminId, req.params.id);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Reject registration
    async rejectRegistration(req, res) {
        try {
            const adminId = req.admin?.adminId;
            if (!adminId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            const result = await registrationService_1.default.rejectRegistration(adminId, req.params.id);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Get pending registrations
    async getPendingRegistrations(req, res) {
        try {
            const registrations = await registrationService_1.default.getPendingRegistrations();
            res.json(registrations);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // Get approved registrations
    async getApprovedRegistrations(req, res) {
        try {
            const registrations = await registrationService_1.default.getApprovedRegistrations();
            res.json(registrations);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // Get registrations for specific event
    async getEventRegistrations(req, res) {
        try {
            const registrations = await registrationService_1.default.getEventRegistrations(req.params.eventId);
            res.json(registrations);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new AdminController();
