"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = __importDefault(require("../controllers/eventController"));
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const eventSchema_1 = require("../schemas/eventSchema");
const router = (0, express_1.Router)();
// Public routes
router.get('/', eventController_1.default.getAllEvents.bind(eventController_1.default));
router.get('/upcoming', eventController_1.default.getUpcomingEvents.bind(eventController_1.default));
router.get('/started', eventController_1.default.getStartedEvents.bind(eventController_1.default)); // NEW: Get started events
router.get('/:id', (0, validate_1.validateParams)(eventSchema_1.eventIdSchema), eventController_1.default.getEventById.bind(eventController_1.default));
// Protected routes - require authentication
router.post('/', auth_1.authenticateToken, (0, validate_1.validateBody)(eventSchema_1.createEventSchema), eventController_1.default.createEvent.bind(eventController_1.default));
router.put('/:id', auth_1.authenticateToken, (0, validate_1.validateParams)(eventSchema_1.eventIdSchema), (0, validate_1.validateBody)(eventSchema_1.updateEventSchema), eventController_1.default.updateEvent.bind(eventController_1.default));
router.delete('/:id', auth_1.authenticateToken, (0, validate_1.validateParams)(eventSchema_1.eventIdSchema), eventController_1.default.deleteEvent.bind(eventController_1.default));
exports.default = router;
// import { Router } from 'express';
// import eventController from '../controllers/eventController';
// import { authenticateToken } from '../middleware/auth';
// import { validate, validateParams } from '../middleware/validate';
// import { createEventSchema, updateEventSchema, eventIdSchema } from '../schemas/eventSchema';
// const router = Router();
// // Public routes
// router.get('/', eventController.getAllEvents.bind(eventController));
// router.get('/upcoming', eventController.getUpcomingEvents.bind(eventController));
// router.get('/:id', validateParams(eventIdSchema), eventController.getEventById.bind(eventController));
// // Protected routes
// router.post('/', authenticateToken, validate(createEventSchema), eventController.createEvent.bind(eventController));
// router.put('/:id', authenticateToken, validateParams(eventIdSchema), validate(updateEventSchema), eventController.updateEvent.bind(eventController));
// router.delete('/:id', authenticateToken, validateParams(eventIdSchema), eventController.deleteEvent.bind(eventController));
// export default router;
