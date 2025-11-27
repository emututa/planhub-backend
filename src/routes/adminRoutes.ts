import { Router } from 'express';
import adminController from '../controllers/adminController';
import { authenticateAdmin } from '../middleware/adminAuth';

const router = Router();

// 🆕 NEW: Public route - Initialize first admin (only works once)
router.post('/init-first', adminController.initFirstAdmin.bind(adminController));

// Public route - Admin login
router.post('/login', adminController.login.bind(adminController));

// Protected routes - require admin authentication
router.post('/create', authenticateAdmin, adminController.createAdmin.bind(adminController));
router.get('/', authenticateAdmin, adminController.getAllAdmins.bind(adminController));
router.delete('/:id', authenticateAdmin, adminController.deleteAdmin.bind(adminController));

// Registration management routes
router.get('/registrations/pending', authenticateAdmin, adminController.getPendingRegistrations.bind(adminController));
router.get('/registrations/approved', authenticateAdmin, adminController.getApprovedRegistrations.bind(adminController));
router.get('/registrations/event/:eventId', authenticateAdmin, adminController.getEventRegistrations.bind(adminController));
router.post('/registrations/:id/approve', authenticateAdmin, adminController.approveRegistration.bind(adminController));
router.post('/registrations/:id/reject', authenticateAdmin, adminController.rejectRegistration.bind(adminController));

export default router;