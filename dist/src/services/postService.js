"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
class PostService {
    async createPost(data) {
        return await prisma_1.default.posts.create({
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
        return await prisma_1.default.posts.findMany({
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
    async getPostById(id) {
        const post = await prisma_1.default.posts.findUnique({
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
    async getPostsByUserId(userId) {
        return await prisma_1.default.posts.findMany({
            where: { user_id: userId },
            orderBy: {
                created_at: 'desc'
            }
        });
    }
    async updatePost(id, data) {
        return await prisma_1.default.posts.update({
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
    async deletePost(id) {
        await prisma_1.default.posts.delete({
            where: { id }
        });
        return { message: 'Post deleted successfully' };
    }
}
exports.default = new PostService();
