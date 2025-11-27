



import { Router } from 'express';
import eventController from '../controllers/eventController';
import { authenticateToken } from '../middleware/auth';
import { validateBody, validateParams } from '../middleware/validate';
import { createEventSchema, updateEventSchema, eventIdSchema } from '../schemas/eventSchema';

const router = Router();

// Public routes
router.get('/', eventController.getAllEvents.bind(eventController));
router.get('/upcoming', eventController.getUpcomingEvents.bind(eventController));
router.get('/started', eventController.getStartedEvents.bind(eventController)); // NEW: Get started events
router.get('/:id', validateParams(eventIdSchema), eventController.getEventById.bind(eventController));

// Protected routes - require authentication
router.post('/', authenticateToken, validateBody(createEventSchema), eventController.createEvent.bind(eventController));
router.put('/:id', authenticateToken, validateParams(eventIdSchema), validateBody(updateEventSchema), eventController.updateEvent.bind(eventController));
router.delete('/:id', authenticateToken, validateParams(eventIdSchema), eventController.deleteEvent.bind(eventController));

export default router;












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