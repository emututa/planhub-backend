"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registrationService_1 = __importDefault(require("../services/registrationService"));
class RegistrationController {
    // Public route - anyone can register with name and email
    async registerForEvent(req, res) {
        try {
            const { event_id, name, email } = req.body;
            const registration = await registrationService_1.default.registerForEvent({
                event_id,
                name,
                email
            });
            res.status(201).json({
                message: 'Registration submitted successfully! Waiting for admin approval.',
                registration
            });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Get registrations by email (for users to check their registrations)
    async getRegistrationsByEmail(req, res) {
        try {
            const { email } = req.query;
            if (!email || typeof email !== 'string') {
                res.status(400).json({ error: 'Email is required' });
                return;
            }
            const registrations = await registrationService_1.default.getUserRegistrationsByEmail(email);
            res.json(registrations);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getEventRegistrations(req, res) {
        try {
            const registrations = await registrationService_1.default.getEventRegistrations(req.params.eventId);
            res.json(registrations);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getUserRegistrations(req, res) {
        try {
            const registrations = await registrationService_1.default.getUserRegistrations(req.params.userId);
            res.json(registrations);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getRegistrationById(req, res) {
        try {
            const registration = await registrationService_1.default.getRegistrationById(req.params.id);
            res.json(registration);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    async cancelRegistration(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                res.status(400).json({ error: 'Email is required to cancel registration' });
                return;
            }
            const result = await registrationService_1.default.cancelRegistration(req.params.id, email);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new RegistrationController();
