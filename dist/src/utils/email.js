"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const mail_1 = __importDefault(require("../config/mail"));
async function sendEmail(to, subject, message) {
    try {
        await mail_1.default.sendMail({
            from: '"PlanHub" <no-reply@myapp.com>',
            to,
            subject,
            text: message
        });
        return { success: true, message: "Email sent successfully From PlanHub" };
    }
    catch (error) {
        console.error("Email error:", error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return { success: false, error: errorMessage };
    }
}
