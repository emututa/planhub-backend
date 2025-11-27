"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controllers/adminController"));
const adminAuth_1 = require("../middleware/adminAuth");
const router = (0, express_1.Router)();
// 🆕 NEW: Public route - Initialize first admin (only works once)
router.post('/init-first', adminController_1.default.initFirstAdmin.bind(adminController_1.default));
// Public route - Admin login
router.post('/login', adminController_1.default.login.bind(adminController_1.default));
// Protected routes - require admin authentication
router.post('/create', adminAuth_1.authenticateAdmin, adminController_1.default.createAdmin.bind(adminController_1.default));
router.get('/', adminAuth_1.authenticateAdmin, adminController_1.default.getAllAdmins.bind(adminController_1.default));
router.delete('/:id', adminAuth_1.authenticateAdmin, adminController_1.default.deleteAdmin.bind(adminController_1.default));
// Registration management routes
router.get('/registrations/pending', adminAuth_1.authenticateAdmin, adminController_1.default.getPendingRegistrations.bind(adminController_1.default));
router.get('/registrations/approved', adminAuth_1.authenticateAdmin, adminController_1.default.getApprovedRegistrations.bind(adminController_1.default));
router.get('/registrations/event/:eventId', adminAuth_1.authenticateAdmin, adminController_1.default.getEventRegistrations.bind(adminController_1.default));
router.post('/registrations/:id/approve', adminAuth_1.authenticateAdmin, adminController_1.default.approveRegistration.bind(adminController_1.default));
router.post('/registrations/:id/reject', adminAuth_1.authenticateAdmin, adminController_1.default.rejectRegistration.bind(adminController_1.default));
exports.default = router;
