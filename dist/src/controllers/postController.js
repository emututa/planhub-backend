"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postService_1 = __importDefault(require("../services/postService"));
class PostController {
    async createPost(req, res) {
        try {
            const post = await postService_1.default.createPost({
                ...req.body,
                user_id: req.user?.userId
            });
            res.status(201).json(post);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllPosts(req, res) {
        try {
            const posts = await postService_1.default.getAllPosts();
            res.json(posts);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getPostById(req, res) {
        try {
            const post = await postService_1.default.getPostById(req.params.id);
            res.json(post);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    async getPostsByUserId(req, res) {
        try {
            const posts = await postService_1.default.getPostsByUserId(req.params.userId);
            res.json(posts);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updatePost(req, res) {
        try {
            const post = await postService_1.default.updatePost(req.params.id, req.body);
            res.json(post);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deletePost(req, res) {
        try {
            const result = await postService_1.default.deletePost(req.params.id);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new PostController();
// import { Response } from 'express';
// import { AuthRequest } from '../middleware/auth';
// import postService from '../services/postService';
// class PostController {
//   async createPost(req: AuthRequest, res: Response): Promise<void> {
//     try {
//       const post = await postService.createPost({
//         ...req.body,
//         user_id: req.user?.userId
//       });
//       res.status(201).json(post);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }
//   async getAllPosts(req: AuthRequest, res: Response): Promise<void> {
//     try {
//       const posts = await postService.getAllPosts();
//       res.json(posts);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }
//   async getPostById(req: AuthRequest, res: Response): Promise<void> {
//     try {
//       const post = await postService.getPostById(req.params.id);
//       res.json(post);
//     } catch (error: any) {
//       res.status(404).json({ error: error.message });
//     }
//   }
//   async getPostsByUserId(req: AuthRequest, res: Response): Promise<void> {
//     try {
//       const posts = await postService.getPostsByUserId(req.params.userId);
//       res.json(posts);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }
//   async updatePost(req: AuthRequest, res: Response): Promise<void> {
//     try {
//       const post = await postService.updatePost(req.params.id, req.body);
//       res.json(post);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }
//   async deletePost(req: AuthRequest, res: Response): Promise<void> {
//     try {
//       const result = await postService.deletePost(req.params.id);
//       res.json(result);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }
// }
// export default new PostController();
