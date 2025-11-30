

import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import eventService from '../services/eventService';

class EventController {
  async createEvent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const event = await eventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllEvents(req: AuthRequest, res: Response): Promise<void> {
    try {
      const events = await eventService.getAllEvents();
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEventById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const event = await eventService.getEventById(req.params.id);
      res.json(event);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getUpcomingEvents(req: AuthRequest, res: Response): Promise<void> {
    try {
      const events = await eventService.getUpcomingEvents();
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // 🆕 NEW: Get events that have already started
  async getStartedEvents(req: AuthRequest, res: Response): Promise<void> {
    try {
      const events = await eventService.getStartedEvents();
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateEvent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      res.json(event);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteEvent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await eventService.deleteEvent(req.params.id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new EventController();