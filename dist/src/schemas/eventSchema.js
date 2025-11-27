"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventIdSchema = exports.updateEventSchema = exports.createEventSchema = void 0;
const zod_1 = require("zod");
// Create Event Schema
exports.createEventSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long'),
    description: zod_1.z.string().max(5000, 'Description too long').optional(),
    image_url: zod_1.z.string().url('Invalid image URL').optional(),
    event_date: zod_1.z.string().refine((date) => {
        const parsed = new Date(date);
        return !isNaN(parsed.getTime());
    }, 'Invalid date format')
});
// Update Event Schema
exports.updateEventSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long').optional(),
    description: zod_1.z.string().max(5000, 'Description too long').optional(),
    image_url: zod_1.z.string().url('Invalid image URL').optional(),
    event_date: zod_1.z.string().refine((date) => {
        const parsed = new Date(date);
        return !isNaN(parsed.getTime());
    }, 'Invalid date format').optional()
});
// Event ID Param Schema
exports.eventIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid event ID')
});
