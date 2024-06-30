"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrderById = exports.getMyOrders = exports.addOrdersItems = void 0;
const order_1 = __importDefault(require("../models/order"));
// @desc: Create new order
// @route GET /api/v1/orders
// @access: Private
const addOrdersItems = async (req, res, next) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, quantity, } = req.body;
        if (!orderItems || orderItems.length === 0) {
            res.status(400);
            throw new Error("No order items");
        }
        console.log(req);
        const order = new order_1.default({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            quantity,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
    catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};
exports.addOrdersItems = addOrdersItems;
// @desc: Get order by id
// @route GET /api/v1/orders/myorders
// @access: Private
const getMyOrders = async (req, res, next) => {
    try {
        const orders = order_1.default.find({ user: req.user._id });
        res.status(200).json(orders);
    }
    catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};
exports.getMyOrders = getMyOrders;
// @desc: Get order by id
// @route GET /api/v1/orders/:id
// @access: Private
const getOrderById = async (req, res, next) => {
    const order = await order_1.default.findById(req.params.id).populate("user", "name email");
    if (order) {
        res.status(200).json(order);
    }
    else {
        res.status(404);
        throw new Error("Order not found, please check it again");
    }
};
exports.getOrderById = getOrderById;
// @desc: Update order "IsPaid" status to paid(true)
// @route GET /api/v1/orders/:id/pay
// @access: Private
const updateOrderToPaid = async (req, res, next) => {
    res.send("update order to paid");
};
exports.updateOrderToPaid = updateOrderToPaid;
// @desc: Update order "IsDelivered" status to paid(true)
// @route GET /api/v1/orders/:id/deliver
// @access: Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
    res.send("update order to delivered");
};
exports.updateOrderToDelivered = updateOrderToDelivered;
// @desc: Get all orders
// @route GET /api/v1/orders
// @access: Private/Admin
const getAllOrders = async (req, res, next) => {
    res.send("All orders");
};
exports.getAllOrders = getAllOrders;
