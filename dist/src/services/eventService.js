"use strict";
// import prisma from '../config/prisma';
// import { CreateEventInput, UpdateEventInput } from '../schemas/eventSchema';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// class EventService {
//   async createEvent(data: CreateEventInput) {
//     return await prisma.events.create({
//       data: {
//         title: data.title,
//         description: data.description,
//         image_url: data.image_url,
//         event_date: new Date(data.event_date)
//       }
//     });
//   }
//   async getAllEvents() {
//     return await prisma.events.findMany({
//       orderBy: {
//         event_date: 'asc'
//       },
//       include: {
//         event_registrations: {
//           include: {
//             users: {
//               select: {
//                 id: true,
//                 name: true,
//                 email: true
//               }
//             }
//           }
//         }
//       }
//     });
//   }
//   async getEventById(id: string) {
//     const event = await prisma.events.findUnique({
//       where: { id },
//       include: {
//         event_registrations: {
//           include: {
//             users: {
//               select: {
//                 id: true,
//                 name: true,
//                 email: true
//               }
//             }
//           }
//         }
//       }
//     });
//     if (!event) {
//       throw new Error('Event not found');
//     }
//     return event;
//   }
//   async getUpcomingEvents() {
//     return await prisma.events.findMany({
//       where: {
//         event_date: {
//           gte: new Date()
//         }
//       },
//       orderBy: {
//         event_date: 'asc'
//       }
//     });
//   }
//   async updateEvent(id: string, data: UpdateEventInput) {
//     return await prisma.events.update({
//       where: { id },
//       data: {
//         ...data,
//         event_date: data.event_date ? new Date(data.event_date) : undefined
//       }
//     });
//   }
//   async deleteEvent(id: string) {
//     await prisma.events.delete({
//       where: { id }
//     });
//     return { message: 'Event deleted successfully' };
//   }
// }
// export default new EventService();
const prisma_1 = __importDefault(require("../config/prisma"));
class EventService {
    // Helper function to add event status
    addEventStatus(event) {
        const now = new Date();
        const eventDate = new Date(event.event_date);
        return {
            ...event,
            status: eventDate <= now ? 'started' : 'upcoming',
            timeUntilStart: eventDate > now ? eventDate.getTime() - now.getTime() : 0,
            hasStarted: eventDate <= now
        };
    }
    async createEvent(data) {
        const event = await prisma_1.default.events.create({
            data: {
                title: data.title,
                description: data.description,
                image_url: data.image_url,
                event_date: new Date(data.event_date)
            }
        });
        return this.addEventStatus(event);
    }
    async getAllEvents() {
        const events = await prisma_1.default.events.findMany({
            orderBy: {
                event_date: 'asc'
            },
            include: {
                event_registrations: {
                    include: {
                        users: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });
        return events.map(event => this.addEventStatus(event));
    }
    async getEventById(id) {
        const event = await prisma_1.default.events.findUnique({
            where: { id },
            include: {
                event_registrations: {
                    include: {
                        users: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });
        if (!event) {
            throw new Error('Event not found');
        }
        return this.addEventStatus(event);
    }
    async getUpcomingEvents() {
        const events = await prisma_1.default.events.findMany({
            where: {
                event_date: {
                    gte: new Date()
                }
            },
            orderBy: {
                event_date: 'asc'
            }
        });
        return events.map(event => this.addEventStatus(event));
    }
    async getStartedEvents() {
        const events = await prisma_1.default.events.findMany({
            where: {
                event_date: {
                    lt: new Date()
                }
            },
            orderBy: {
                event_date: 'desc'
            }
        });
        return events.map(event => this.addEventStatus(event));
    }
    async updateEvent(id, data) {
        const event = await prisma_1.default.events.update({
            where: { id },
            data: {
                ...data,
                event_date: data.event_date ? new Date(data.event_date) : undefined
            }
        });
        return this.addEventStatus(event);
    }
    async deleteEvent(id) {
        await prisma_1.default.events.delete({
            where: { id }
        });
        return { message: 'Event deleted successfully' };
    }
}
exports.default = new EventService();
