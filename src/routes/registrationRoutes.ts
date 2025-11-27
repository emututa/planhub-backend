import { Router } from 'express';
import registrationController from '../controllers/registrationController';
import { validateBody } from '../middleware/validate';
import { createRegistrationSchema } from '../schemas/registrationSchema';

const router = Router();

// PUBLIC ROUTE - Anyone can register with name and email
router.post(
  '/', 
  validateBody(createRegistrationSchema), 
  registrationController.registerForEvent.bind(registrationController)
);

// Get user's registrations by email (public)
router.get(
  '/my-registrations',
  registrationController.getRegistrationsByEmail.bind(registrationController)
);

// Get event registrations (public - to see who's attending)
router.get(
  '/event/:eventId',
  registrationController.getEventRegistrations.bind(registrationController)
);

// Cancel registration (needs email verification)
router.delete(
  '/:id',
  registrationController.cancelRegistration.bind(registrationController)
);

// Get specific registration
router.get(
  '/:id',
  registrationController.getRegistrationById.bind(registrationController)
);

export default router;