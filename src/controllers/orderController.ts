import { RequestHandler } from "express";
import Order from "../models/order";
import Review from "../models/review";

interface DataType<T> {
  data: T;
  message: string;
  count?: number;
}

// @desc: Create new order
// @route GET /api/v1/orders
// @access: Private
export const addOrdersItems: RequestHandler = async (req:any, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    const order = new Order({
      orderItems: orderItems.map((x: any) => ({
        ...x, 
        product: x._id
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
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

// @desc: Get order by id
// @route GET /api/v1/orders/myorders
// @access: Private
export const getMyOrders: RequestHandler = async (req: any, res, next) => {
  try {
    const orders = Order.find({ user: req.user._id });
    res.status(200).json(orders);
  }
catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

// @desc: Get order by id
// @route GET /api/v1/orders/:id
// @access: Private
export const getOrderById: RequestHandler = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order)
  {
      res.status(200).json(order);
  }
  else {
    res.status(404);
    throw new Error('Order not found, please check it again');
  }

};

// @desc: Update order "IsPaid" status to paid(true)
// @route GET /api/v1/orders/:id/pay
// @access: Private
export const updateOrderToPaid: RequestHandler = async (req, res, next) => {
  res.send("update order to paid");
};
// @desc: Update order "IsDelivered" status to paid(true)
// @route GET /api/v1/orders/:id/deliver
// @access: Private/Admin
export const updateOrderToDelivered: RequestHandler = async (
  req,
  res,
  next
) => {
  res.send("update order to delivered");
};
// @desc: Get all orders
// @route GET /api/v1/orders
// @access: Private/Admin
export const getAllOrders: RequestHandler = async (req, res, next) => {
  res.send("All orders");
};
