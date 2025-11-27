import { z } from 'zod';

// Register User Schema
export const registerUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address').max(150, 'Email too long'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(255, 'Password too long'),
  mobile: z.string().min(10, 'Mobile must be at least 10 digits').max(20, 'Mobile too long')  // REQUIRED NOW
});

// Login User Schema
export const loginUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

// Update User Schema
export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long').optional(),
  email: z.string().email('Invalid email address').max(150, 'Email too long').optional(),
  mobile: z.string().min(10, 'Mobile must be at least 10 digits').max(20, 'Mobile too long').optional()
});

// User ID Param Schema
export const userIdSchema = z.object({
  id: z.string().uuid('Invalid user ID')
});

// Type exports
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;












// import { z } from 'zod';

// // Register User Schema
// export const registerUserSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
//   email: z.string().email('Invalid email address').max(150, 'Email too long'),
//   password: z.string().min(6, 'Password must be at least 6 characters').max(255, 'Password too long'),
//   mobile: z.string().min(10, 'Mobile must be at least 10 digits').max(20, 'Mobile too long').optional()
// });

// // Login User Schema
// export const loginUserSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(1, 'Password is required')
// });

// // Update User Schema
// export const updateUserSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long').optional(),
//   email: z.string().email('Invalid email address').max(150, 'Email too long').optional(),
//   mobile: z.string().min(10, 'Mobile must be at least 10 digits').max(20, 'Mobile too long').optional()
// });

// // User ID Param Schema
// export const userIdSchema = z.object({
//   id: z.string().uuid('Invalid user ID')
// });

// // Type exports
// export type RegisterUserInput = z.infer<typeof registerUserSchema>;
// export type LoginUserInput = z.infer<typeof loginUserSchema>;
// export type UpdateUserInput = z.infer<typeof updateUserSchema>;