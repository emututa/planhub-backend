


import prisma from '../config/prisma';
import { CreateEventInput, UpdateEventInput } from '../schemas/eventSchema';

class EventService {
  // Helper function to add event status
  private addEventStatus(event: any) {
    const now = new Date();
    const eventDate = new Date(event.event_date);
    
    return {
      ...event,
      status: eventDate <= now ? 'started' : 'upcoming',
      timeUntilStart: eventDate > now ? eventDate.getTime() - now.getTime() : 0,
      hasStarted: eventDate <= now
    };
  }

  async createEvent(data: CreateEventInput) {
    const event = await prisma.events.create({
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
    const events = await prisma.events.findMany({
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

  async getEventById(id: string) {
    const event = await prisma.events.findUnique({
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
    const events = await prisma.events.findMany({
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
    const events = await prisma.events.findMany({
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

  async updateEvent(id: string, data: UpdateEventInput) {
    const event = await prisma.events.update({
      where: { id },
      data: {
        ...data,
        event_date: data.event_date ? new Date(data.event_date) : undefined
      }
    });
    
    return this.addEventStatus(event);
  }

  async deleteEvent(id: string) {
    await prisma.events.delete({
      where: { id }
    });
    return { message: 'Event deleted successfully' };
  }
}

export default new EventService();
