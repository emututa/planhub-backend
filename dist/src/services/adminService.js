"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AdminService {
    // 🆕 NEW: Initialize First Admin (only works if no admin exists)
    async initFirstAdmin(data) {
        // Check if any admin exists
        const existingAdmin = await prisma_1.default.admins.findFirst();
        if (existingAdmin) {
            throw new Error('An admin already exists. Use login instead.');
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const firstAdmin = await prisma_1.default.admins.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                mobile: data.mobile,
                created_by: null
            }
        });
        const token = jsonwebtoken_1.default.sign({ adminId: firstAdmin.id, email: firstAdmin.email, role: 'admin' }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
        return {
            admin: {
                id: firstAdmin.id,
                name: firstAdmin.name,
                email: firstAdmin.email,
                mobile: firstAdmin.mobile
            },
            token
        };
    }
    // Admin login (no register - only created by other admins)
    async login(email, password) {
        const admin = await prisma_1.default.admins.findUnique({
            where: { email }
        });
        if (!admin) {
            throw new Error('Invalid credentials');
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, admin.password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }
        const token = jsonwebtoken_1.default.sign({ adminId: admin.id, email: admin.email, role: 'admin' }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
        return {
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                mobile: admin.mobile
            },
            token
        };
    }
    // Admin creates another admin
    async createAdmin(creatorAdminId, data) {
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const newAdmin = await prisma_1.default.admins.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                mobile: data.mobile,
                created_by: creatorAdminId
            },
            select: {
                id: true,
                name: true,
                email: true,
                mobile: true,
                created_at: true
            }
        });
        return newAdmin;
    }
    async getAllAdmins() {
        return await prisma_1.default.admins.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                mobile: true,
                created_at: true,
                creator: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
    }
    async deleteAdmin(adminId) {
        await prisma_1.default.admins.delete({
            where: { id: adminId }
        });
        return { message: 'Admin deleted successfully' };
    }
}
exports.default = new AdminService();
