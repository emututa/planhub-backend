import { z } from 'zod';

// Create Post Schema
export const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long'),
  description: z.string().max(5000, 'Description too long').optional(),
  image_url: z.string().url('Invalid image URL').optional()
});

// Update Post Schema
export const updatePostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long').optional(),
  description: z.string().max(5000, 'Description too long').optional(),
  image_url: z.string().url('Invalid image URL').optional()
});

// Post ID Param Schema
export const postIdSchema = z.object({
  id: z.string().uuid('Invalid post ID')
});

// User ID Param Schema
export const userIdParamSchema = z.object({
  userId: z.string().uuid('Invalid user ID')
});

// Type exports
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;