import prisma from '../config/prisma';
import { CreatePostInput, UpdatePostInput } from '../schemas/postSchema';

class PostService {
  async createPost(data: CreatePostInput & { user_id: string }) {
    return await prisma.posts.create({
      data: {
        user_id: data.user_id,
        title: data.title,
        description: data.description,
        image_url: data.image_url
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async getAllPosts() {
    return await prisma.posts.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  async getPostById(id: string) {
    const post = await prisma.posts.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }

  async getPostsByUserId(userId: string) {
    return await prisma.posts.findMany({
      where: { user_id: userId },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  async updatePost(id: string, data: UpdatePostInput) {
    return await prisma.posts.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date()
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async deletePost(id: string) {
    await prisma.posts.delete({
      where: { id }
    });
    return { message: 'Post deleted successfully' };
  }
}

export default new PostService();










