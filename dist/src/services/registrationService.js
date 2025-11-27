"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
const sms_1 = require("../utils/sms");
class RegistrationService {
    // User registers for event with name and email
    async registerForEvent(data) {
        // Check if user exists in database with this name and email
        const user = await prisma_1.default.users.findFirst({
            where: {
                name: data.name,
                email: data.email
            }
        });
        if (!user) {
            throw new Error('User with this name and email not found in database. Please register first.');
        }
        // Check if already registered
        const existing = await prisma_1.default.event_registrations.findFirst({
            where: {
                user_id: user.id,
                event_id: data.event_id
            }
        });
        if (existing) {
            throw new Error('You are already registered for this event');
        }
        // Create registration
        const registration = await prisma_1.default.event_registrations.create({
            data: {
                user_id: user.id,
                event_id: data.event_id,
                status: 'pending'
            },
            include: {
                events: true,
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        mobile: true
                    }
                }
            }
        });
        // Send SMS notification to user
        if (user.mobile) {
            await (0, sms_1.sendSMS)(user.mobile, `Hi ${user.name}! Your registration for "${registration.events.title}" is pending approval. We'll notify you once approved.`);
        }
        return registration;
    }
    // Admin approves registration
    async approveRegistration(adminId, registrationId) {
        const registration = await prisma_1.default.event_registrations.update({
            where: { id: registrationId },
            data: {
                status: 'approved',
                approved_by: adminId,
                approved_at: new Date()
            },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        mobile: true
                    }
                },
                events: {
                    select: {
                        title: true,
                        event_date: true
                    }
                }
            }
        });
        // Send approval SMS to user
        if (registration.users.mobile) {
            await (0, sms_1.sendSMS)(registration.users.mobile, `Great news ${registration.users.name}! Your registration for "${registration.events.title}" has been APPROVED! Event date: ${new Date(registration.events.event_date).toLocaleDateString()}`);
        }
        return registration;
    }
    // Admin rejects registration
    async rejectRegistration(adminId, registrationId) {
        const registration = await prisma_1.default.event_registrations.update({
            where: { id: registrationId },
            data: {
                status: 'rejected',
                approved_by: adminId,
                approved_at: new Date()
            },
            include: {
                users: {
                    select: {
                        name: true,
                        mobile: true
                    }
                },
                events: {
                    select: {
                        title: true
                    }
                }
            }
        });
        // Send rejection SMS
        if (registration.users.mobile) {
            await (0, sms_1.sendSMS)(registration.users.mobile, `Hi ${registration.users.name}, unfortunately your registration for "${registration.events.title}" was not approved. Please contact us for more info.`);
        }
        return registration;
    }
    // Get all registrations for an event (for admin dashboard)
    async getEventRegistrations(eventId) {
        return await prisma_1.default.event_registrations.findMany({
            where: { event_id: eventId },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        mobile: true
                    }
                }
            },
            orderBy: {
                registered_at: 'desc'
            }
        });
    }
    // Get pending registrations (for admin)
    async getPendingRegistrations() {
        return await prisma_1.default.event_registrations.findMany({
            where: { status: 'pending' },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        mobile: true
                    }
                },
                events: {
                    select: {
                        id: true,
                        title: true,
                        event_date: true
                    }
                }
            },
            orderBy: {
                registered_at: 'desc'
            }
        });
    }
    // Get all approved registrations
    async getApprovedRegistrations() {
        return await prisma_1.default.event_registrations.findMany({
            where: { status: 'approved' },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        mobile: true
                    }
                },
                events: {
                    select: {
                        id: true,
                        title: true,
                        event_date: true
                    }
                }
            },
            orderBy: {
                registered_at: 'desc'
            }
        });
    }
    // Get user's own registrations by email
    async getUserRegistrationsByEmail(email) {
        const user = await prisma_1.default.users.findUnique({
            where: { email }
        });
        if (!user) {
            throw new Error('User not found');
        }
        return await prisma_1.default.event_registrations.findMany({
            where: { user_id: user.id },
            include: {
                events: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        image_url: true,
                        event_date: true
                    }
                }
            },
            orderBy: {
                registered_at: 'desc'
            }
        });
    }
    async getUserRegistrations(userId) {
        return await prisma_1.default.event_registrations.findMany({
            where: { user_id: userId },
            include: {
                events: true
            },
            orderBy: {
                registered_at: 'desc'
            }
        });
    }
    async cancelRegistration(registrationId, email) {
        // Verify user owns this registration
        const registration = await prisma_1.default.event_registrations.findUnique({
            where: { id: registrationId },
            include: {
                users: true
            }
        });
        if (!registration) {
            throw new Error('Registration not found');
        }
        if (registration.users.email !== email) {
            throw new Error('Unauthorized to cancel this registration');
        }
        await prisma_1.default.event_registrations.delete({
            where: { id: registrationId }
        });
        return { message: 'Registration cancelled successfully' };
    }
    async getRegistrationById(id) {
        const registration = await prisma_1.default.event_registrations.findUnique({
            where: { id },
            include: {
                events: true,
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        mobile: true
                    }
                }
            }
        });
        if (!registration) {
            throw new Error('Registration not found');
        }
        return registration;
    }
}
exports.default = new RegistrationService();
