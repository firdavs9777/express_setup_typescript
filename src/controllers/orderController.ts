import { RequestHandler } from "express";
import Order from "../models/order";

interface DataType<T> {
  data: T;
  message: string;
  count?: number;
}

// @desc: Create new order
// @route GET /api/v1/orders
// @access: Private
export const addOrdersItems: RequestHandler = async (req, res, next) => {
  res.send("add order items");
};

// @desc: Get order by id
// @route GET /api/v1/orders/myorders
// @access: Private
export const getMyOrders: RequestHandler = async (req, res, next) => {
  res.send("Get my orders");
};

// @desc: Get order by id
// @route GET /api/v1/orders/:id
// @access: Private
export const getOrderById: RequestHandler = async (req, res, next) => {
  res.send("Get order by id");
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
