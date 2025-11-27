import { Response, Request } from 'express';
import adminService from '../services/adminService';
import registrationService from '../services/registrationService';

export interface AdminRequest extends Request {
  admin?: {
    adminId: string;
    email: string;
    role: string;
  };
}

class AdminController {
  // 🆕 NEW: Initialize first admin
  async initFirstAdmin(req: Request, res: Response): Promise<void> {
    try {
      const result = await adminService.initFirstAdmin(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Admin login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await adminService.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  // Admin creates another admin
  async createAdmin(req: AdminRequest, res: Response): Promise<void> {
    try {
      const adminId = req.admin?.adminId;
      if (!adminId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const newAdmin = await adminService.createAdmin(adminId, req.body);
      res.status(201).json(newAdmin);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get all admins
  async getAllAdmins(req: Request, res: Response): Promise<void> {
    try {
      const admins = await adminService.getAllAdmins();
      res.json(admins);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete admin
  async deleteAdmin(req: Request, res: Response): Promise<void> {
    try {
      const result = await adminService.deleteAdmin(req.params.id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Approve registration
  async approveRegistration(req: AdminRequest, res: Response): Promise<void> {
    try {
      const adminId = req.admin?.adminId;
      if (!adminId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const result = await registrationService.approveRegistration(
        adminId,
        req.params.id
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Reject registration
  async rejectRegistration(req: AdminRequest, res: Response): Promise<void> {
    try {
      const adminId = req.admin?.adminId;
      if (!adminId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const result = await registrationService.rejectRegistration(
        adminId,
        req.params.id
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get pending registrations
  async getPendingRegistrations(req: Request, res: Response): Promise<void> {
    try {
      const registrations = await registrationService.getPendingRegistrations();
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get approved registrations
  async getApprovedRegistrations(req: Request, res: Response): Promise<void> {
    try {
      const registrations = await registrationService.getApprovedRegistrations();
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get registrations for specific event
  async getEventRegistrations(req: Request, res: Response): Promise<void> {
    try {
      const registrations = await registrationService.getEventRegistrations(req.params.eventId);
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AdminController();