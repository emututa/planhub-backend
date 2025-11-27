import { z } from 'zod';

// Create Registration Schema - NOW includes name and email
export const createRegistrationSchema = z.object({
  event_id: z.string().uuid('Invalid event ID'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address').max(150, 'Email too long')
});

// Registration ID Param Schema
export const registrationIdSchema = z.object({
  id: z.string().uuid('Invalid registration ID')
});

// Event ID Param Schema
export const eventIdParamSchema = z.object({
  eventId: z.string().uuid('Invalid event ID')
});

// User ID Param Schema
export const userIdParamSchema = z.object({
  userId: z.string().uuid('Invalid user ID')
});

// Type exports
export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>;