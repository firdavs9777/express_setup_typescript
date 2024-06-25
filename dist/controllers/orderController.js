"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrderById = exports.getMyOrders = exports.addOrdersItems = void 0;
const order_1 = __importDefault(require("../models/order"));
// interface OrderType {
//   orderItems: []
// }
// @desc: Create new order
// @route GET /api/v1/orders
// @access: Private
const addOrdersItems = async (req, res, next) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
        if (!orderItems || orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
        }
        const order = new order_1.default({
            orderItems: orderItems && orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
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
        const orders = await order_1.default.find({ user: req.user._id });
        res.json(orders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        next(error); // Pass the error to the next middleware for proper error handling
    }
};
exports.getMyOrders = getMyOrders;
// @desc: Get order by id
// @route GET /api/v1/orders/:id
// @access: Private
const getOrderById = async (req, res, next) => {
    const order = await order_1.default.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.status(200).json(order);
    }
    else {
        res.status(404);
        throw new Error('Order not found, please check it again');
    }
};
exports.getOrderById = getOrderById;
// @desc: Update order "IsPaid" status to paid(true)
// @route GET /api/v1/orders/:id/pay
// @access: Private
const updateOrderToPaid = async (req, res, next) => {
    try {
        // updating current order
        const order = await order_1.default.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = new Date();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            };
            const updateOrder = await order.save();
            res.status(200).json(updateOrder);
        }
        else {
            res.status(404);
            throw new Error('Order not found');
        }
    }
    catch (_a) {
    }
    // it will change the status to paid from not paid 
};
exports.updateOrderToPaid = updateOrderToPaid;
// @desc: Update order "IsDelivered" status to paid(true)
// @route GET /api/v1/orders/:id/deliver
// @access: Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
    const order = await order_1.default.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = new Date();
        const updateOrder = await order.save();
        res.status(200).json(updateOrder);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
    res.send("update order to delivered");
};
exports.updateOrderToDelivered = updateOrderToDelivered;
// @desc: Get all orders
// @route GET /api/v1/orders
// @access: Private/Admin
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await order_1.default.find({}).populate('user', 'id name');
        const responseData = {
            count: orders.length,
            data: orders,
            message: 'success'
        };
        res.json(responseData);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getAllOrders = getAllOrders;
