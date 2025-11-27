"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registrationController_1 = __importDefault(require("../controllers/registrationController"));
const validate_1 = require("../middleware/validate");
const registrationSchema_1 = require("../schemas/registrationSchema");
const router = (0, express_1.Router)();
// PUBLIC ROUTE - Anyone can register with name and email
router.post('/', (0, validate_1.validateBody)(registrationSchema_1.createRegistrationSchema), registrationController_1.default.registerForEvent.bind(registrationController_1.default));
// Get user's registrations by email (public)
router.get('/my-registrations', registrationController_1.default.getRegistrationsByEmail.bind(registrationController_1.default));
// Get event registrations (public - to see who's attending)
router.get('/event/:eventId', registrationController_1.default.getEventRegistrations.bind(registrationController_1.default));
// Cancel registration (needs email verification)
router.delete('/:id', registrationController_1.default.cancelRegistration.bind(registrationController_1.default));
// Get specific registration
router.get('/:id', registrationController_1.default.getRegistrationById.bind(registrationController_1.default));
exports.default = router;
