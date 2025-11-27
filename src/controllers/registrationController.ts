import { Response, Request } from 'express';
import registrationService from '../services/registrationService';

class RegistrationController {
  // Public route - anyone can register with name and email
  async registerForEvent(req: Request, res: Response): Promise<void> {
    try {
      const { event_id, name, email } = req.body;
      
      const registration = await registrationService.registerForEvent({
        event_id,
        name,
        email
      });
      
      res.status(201).json({
        message: 'Registration submitted successfully! Waiting for admin approval.',
        registration
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get registrations by email (for users to check their registrations)
  async getRegistrationsByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.query;
      
      if (!email || typeof email !== 'string') {
        res.status(400).json({ error: 'Email is required' });
        return;
      }

      const registrations = await registrationService.getUserRegistrationsByEmail(email);
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEventRegistrations(req: Request, res: Response): Promise<void> {
    try {
      const registrations = await registrationService.getEventRegistrations(req.params.eventId);
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserRegistrations(req: Request, res: Response): Promise<void> {
    try {
      const registrations = await registrationService.getUserRegistrations(req.params.userId);
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRegistrationById(req: Request, res: Response): Promise<void> {
    try {
      const registration = await registrationService.getRegistrationById(req.params.id);
      res.json(registration);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async cancelRegistration(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      
      if (!email) {
        res.status(400).json({ error: 'Email is required to cancel registration' });
        return;
      }

      const result = await registrationService.cancelRegistration(req.params.id, email);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new RegistrationController();