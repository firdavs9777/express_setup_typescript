"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrderById = exports.getMyOrders = exports.addOrdersItems = void 0;
const order_1 = __importDefault(require("../models/order"));
<<<<<<< HEAD
=======
// interface OrderType {
//   orderItems: []
// }
>>>>>>> f57e5748e657c8317418843eb9f4dddf6e475d15
// @desc: Create new order
// @route GET /api/v1/orders
// @access: Private
const addOrdersItems = async (req, res, next) => {
    try {
<<<<<<< HEAD
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
=======
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
>>>>>>> f57e5748e657c8317418843eb9f4dddf6e475d15
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
<<<<<<< HEAD
            quantity,
=======
>>>>>>> f57e5748e657c8317418843eb9f4dddf6e475d15
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
<<<<<<< HEAD
        const orders = order_1.default.find({ user: req.user._id });
        res.status(200).json(orders);
    }
    catch (error) {
        next(error); // Pass the error to the error handling middleware
=======
        const orders = await order_1.default.find({ user: req.user._id });
        res.json(orders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        next(error); // Pass the error to the next middleware for proper error handling
>>>>>>> f57e5748e657c8317418843eb9f4dddf6e475d15
    }
};
exports.getMyOrders = getMyOrders;
// @desc: Get order by id
// @route GET /api/v1/orders/:id
// @access: Private
const getOrderById = async (req, res, next) => {
<<<<<<< HEAD
    const order = await order_1.default.findById(req.params.id).populate("user", "name email");
=======
    const order = await order_1.default.findById(req.params.id).populate('user', 'name email');
>>>>>>> f57e5748e657c8317418843eb9f4dddf6e475d15
    if (order) {
        res.status(200).json(order);
    }
    else {
        res.status(404);
<<<<<<< HEAD
        throw new Error("Order not found, please check it again");
=======
        throw new Error('Order not found, please check it again');
>>>>>>> f57e5748e657c8317418843eb9f4dddf6e475d15
    }
};
exports.getOrderById = getOrderById;
// @desc: Update order "IsPaid" status to paid(true)
// @route GET /api/v1/orders/:id/pay
// @access: Private
const updateOrderToPaid = async (req, res, next) => {
<<<<<<< HEAD
    res.send("update order to paid");
=======
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
>>>>>>> f57e5748e657c8317418843eb9f4dddf6e475d15
};
exports.updateOrderToPaid = updateOrderToPaid;
// @desc: Update order "IsDelivered" status to paid(true)
// @route GET /api/v1/orders/:id/deliver
// @access: Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
<<<<<<< HEAD
=======
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
>>>>>>> f57e5748e657c8317418843eb9f4dddf6e475d15
    res.send("update order to delivered");
};
exports.updateOrderToDelivered = updateOrderToDelivered;
// @desc: Get all orders
// @route GET /api/v1/orders
// @access: Private/Admin
const getAllOrders = async (req, res, next) => {
<<<<<<< HEAD
    res.send("All orders");
=======
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
>>>>>>> f57e5748e657c8317418843eb9f4dddf6e475d15
};
exports.getAllOrders = getAllOrders;
