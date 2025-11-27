import { z } from 'zod';

// Create Event Schema
export const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long'),
  description: z.string().max(5000, 'Description too long').optional(),
  image_url: z.string().url('Invalid image URL').optional(),
  event_date: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, 'Invalid date format')
});

// Update Event Schema
export const updateEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long').optional(),
  description: z.string().max(5000, 'Description too long').optional(),
  image_url: z.string().url('Invalid image URL').optional(),
  event_date: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, 'Invalid date format').optional()
});

// Event ID Param Schema
export const eventIdSchema = z.object({
  id: z.string().uuid('Invalid event ID')
});

// Type exports
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;