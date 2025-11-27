"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    async register(req, res) {
        try {
            const result = await userService_1.default.register(req.body);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async login(req, res) {
        try {
            const result = await userService_1.default.login(req.body);
            res.json(result);
        }
        catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await userService_1.default.getAllUsers();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getUserById(req, res) {
        try {
            const user = await userService_1.default.getUserById(req.params.id);
            res.json(user);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    async updateUser(req, res) {
        try {
            const user = await userService_1.default.updateUser(req.params.id, req.body);
            res.json(user);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteUser(req, res) {
        try {
            const result = await userService_1.default.deleteUser(req.params.id);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new UserController();
