"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./src/routes/postRoutes"));
const eventRoutes_1 = __importDefault(require("./src/routes/eventRoutes"));
const registrationRoutes_1 = __importDefault(require("./src/routes/registrationRoutes"));
const adminRoutes_1 = __importDefault(require("./src/routes/adminRoutes")); // ADD THIS
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/posts', postRoutes_1.default);
app.use('/api/events', eventRoutes_1.default);
app.use('/api/registrations', registrationRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'PlanHub Backend API',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            posts: '/api/posts',
            events: '/api/events',
            registrations: '/api/registrations',
            admin: '/api/admin'
        }
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});
