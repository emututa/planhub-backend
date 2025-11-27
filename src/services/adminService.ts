import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface CreateAdminInput {
  name: string;
  email: string;
  password: string;
  mobile: string;
}

class AdminService {
  // 🆕 NEW: Initialize First Admin (only works if no admin exists)
  async initFirstAdmin(data: CreateAdminInput) {
    // Check if any admin exists
    const existingAdmin = await prisma.admins.findFirst();
    
    if (existingAdmin) {
      throw new Error('An admin already exists. Use login instead.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const firstAdmin = await prisma.admins.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        mobile: data.mobile,
        created_by: null
      }
    });

    const token = jwt.sign(
      { adminId: firstAdmin.id, email: firstAdmin.email, role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

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
  async login(email: string, password: string) {
    const admin = await prisma.admins.findUnique({
      where: { email }
    });

    if (!admin) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

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
  async createAdmin(creatorAdminId: string, data: CreateAdminInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const newAdmin = await prisma.admins.create({
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
    return await prisma.admins.findMany({
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

  async deleteAdmin(adminId: string) {
    await prisma.admins.delete({
      where: { id: adminId }
    });
    return { message: 'Admin deleted successfully' };
  }
}

export default new AdminService();