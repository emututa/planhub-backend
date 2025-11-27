"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdParamSchema = exports.eventIdParamSchema = exports.registrationIdSchema = exports.createRegistrationSchema = void 0;
const zod_1 = require("zod");
// Create Registration Schema - NOW includes name and email
exports.createRegistrationSchema = zod_1.z.object({
    event_id: zod_1.z.string().uuid('Invalid event ID'),
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
    email: zod_1.z.string().email('Invalid email address').max(150, 'Email too long')
});
// Registration ID Param Schema
exports.registrationIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid registration ID')
});
// Event ID Param Schema
exports.eventIdParamSchema = zod_1.z.object({
    eventId: zod_1.z.string().uuid('Invalid event ID')
});
// User ID Param Schema
exports.userIdParamSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid('Invalid user ID')
});
