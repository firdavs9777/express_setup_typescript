"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const OrderRouter = (0, express_1.Router)();
/// Orders without any admin or private middleware
OrderRouter.use(authMiddleware_1.protect);
OrderRouter.post("/", orderController_1.addOrdersItems);
OrderRouter.use(authMiddleware_1.protect);
OrderRouter.get("/myorders", orderController_1.getMyOrders);
// Orders with admin middleware
OrderRouter.use(authMiddleware_1.protect, authMiddleware_1.admin);
OrderRouter.get("/", orderController_1.getAllOrders);
OrderRouter.use(authMiddleware_1.protect);
OrderRouter.get("/:id", orderController_1.getOrderById);
// Routes uses only protect middleware
OrderRouter.use(authMiddleware_1.protect);
OrderRouter.put("/:id/pay", orderController_1.updateOrderToPaid);
OrderRouter.use(authMiddleware_1.protect);
OrderRouter.put("/:id/deliver", orderController_1.updateOrderToDelivered);
exports.default = OrderRouter;
