"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    async register(data) {
        // Validate mobile is provided
        if (!data.mobile) {
            throw new Error('Mobile number is required');
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const user = await prisma_1.default.users.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                mobile: data.mobile // Now TypeScript knows it's not undefined
            },
            select: {
                id: true,
                name: true,
                email: true,
                mobile: true,
                created_at: true
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
        return { user, token };
    }
    async login(data) {
        const user = await prisma_1.default.users.findUnique({
            where: { email: data.email }
        });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isValidPassword = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile
            },
            token
        };
    }
    async getAllUsers() {
        return await prisma_1.default.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                mobile: true,
                created_at: true
            }
        });
    }
    async getUserById(id) {
        const user = await prisma_1.default.users.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                mobile: true,
                created_at: true,
                posts: {
                    select: {
                        id: true,
                        title: true,
                        created_at: true
                    }
                },
                event_registrations: {
                    include: {
                        events: true
                    }
                }
            }
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async updateUser(id, data) {
        return await prisma_1.default.users.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                mobile: true,
                created_at: true
            }
        });
    }
    async deleteUser(id) {
        await prisma_1.default.users.delete({
            where: { id }
        });
        return { message: 'User deleted successfully' };
    }
}
exports.default = new UserService();
// import prisma from '../config/prisma';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { RegisterUserInput, LoginUserInput, UpdateUserInput } from '../schemas/userSchema';
// class UserService {
//   async register(data: RegisterUserInput) {
//     const hashedPassword = await bcrypt.hash(data.password, 10);
//     const user = await prisma.users.create({
//       data: {
//         name: data.name,
//         email: data.email,
//         password: hashedPassword,
//         mobile: data.mobile
//       },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         mobile: true,
//         created_at: true
//       }
//     });
//     const token = jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '7d' }
//     );
//     return { user, token };
//   }
//   async login(data: LoginUserInput) {
//     const user = await prisma.users.findUnique({
//       where: { email: data.email }
//     });
//     if (!user) {
//       throw new Error('Invalid credentials');
//     }
//     const isValidPassword = await bcrypt.compare(data.password, user.password);
//     if (!isValidPassword) {
//       throw new Error('Invalid credentials');
//     }
//     const token = jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '7d' }
//     );
//     return {
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         mobile: user.mobile
//       },
//       token
//     };
//   }
//   async getAllUsers() {
//     return await prisma.users.findMany({
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         mobile: true,
//         created_at: true
//       }
//     });
//   }
//   async getUserById(id: string) {
//     const user = await prisma.users.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         mobile: true,
//         created_at: true,
//         posts: {
//           select: {
//             id: true,
//             title: true,
//             created_at: true
//           }
//         },
//         event_registrations: {
//           include: {
//             events: true
//           }
//         }
//       }
//     });
//     if (!user) {
//       throw new Error('User not found');
//     }
//     return user;
//   }
//   async updateUser(id: string, data: UpdateUserInput) {
//     return await prisma.users.update({
//       where: { id },
//       data,
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         mobile: true,
//         created_at: true
//       }
//     });
//   }
//   async deleteUser(id: string) {
//     await prisma.users.delete({
//       where: { id }
//     });
//     return { message: 'User deleted successfully' };
//   }
// }
// export default new UserService();
