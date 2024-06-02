"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcryptjs_1.default.hashSync('admin123', 10),
        isAdmin: true
    },
    {
        name: 'Test User',
        email: 'test@gmail.com',
        password: bcryptjs_1.default.hashSync('test123', 10),
        isAdmin: true
    },
    {
        name: 'Test User2',
        email: 'test2@gmail.com',
        password: bcryptjs_1.default.hashSync('test123', 10),
        isAdmin: false
    },
    {
        name: 'Test User3',
        email: 'test3@gmail.com',
        password: bcryptjs_1.default.hashSync('test123', 10),
        isAdmin: false
    },
    {
        name: 'Test User4',
        email: 'test4@gmail.com',
        password: bcryptjs_1.default.hashSync('test123'),
        isAdmin: false
    },
];
