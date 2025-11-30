import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import postService from '../services/postService';

class PostController {
  async createPost(req: AuthRequest, res: Response): Promise<void> {
    try {
      const post = await postService.createPost({
        ...req.body,
        user_id: req.user?.userId
      });
      res.status(201).json(post);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllPosts(req: AuthRequest, res: Response): Promise<void> {
    try {
      const posts = await postService.getAllPosts();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPostById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const post = await postService.getPostById(req.params.id);
      res.json(post);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getPostsByUserId(req: AuthRequest, res: Response): Promise<void> {
    try {
      const posts = await postService.getPostsByUserId(req.params.userId);
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePost(req: AuthRequest, res: Response): Promise<void> {
    try {
      const post = await postService.updatePost(req.params.id, req.body);
      res.json(post);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletePost(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await postService.deletePost(req.params.id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new PostController();








