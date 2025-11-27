"use strict";
// import { Response } from 'express';
// import { AuthRequest } from '../middleware/auth';
// import eventService from '../services/eventService';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventService_1 = __importDefault(require("../services/eventService"));
class EventController {
    async createEvent(req, res) {
        try {
            const event = await eventService_1.default.createEvent(req.body);
            res.status(201).json(event);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllEvents(req, res) {
        try {
            const events = await eventService_1.default.getAllEvents();
            res.json(events);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getEventById(req, res) {
        try {
            const event = await eventService_1.default.getEventById(req.params.id);
            res.json(event);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    async getUpcomingEvents(req, res) {
        try {
            const events = await eventService_1.default.getUpcomingEvents();
            res.json(events);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // 🆕 NEW: Get events that have already started
    async getStartedEvents(req, res) {
        try {
            const events = await eventService_1.default.getStartedEvents();
            res.json(events);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateEvent(req, res) {
        try {
            const event = await eventService_1.default.updateEvent(req.params.id, req.body);
            res.json(event);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteEvent(req, res) {
        try {
            const result = await eventService_1.default.deleteEvent(req.params.id);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new EventController();
