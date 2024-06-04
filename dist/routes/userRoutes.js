"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRouter = (0, express_1.Router)();
UserRouter.get('/login');
UserRouter.get('/register');
exports.default = UserRouter;
