import { RequestHandler } from "express";
import Order from "../models/order";
import Review from "../models/review";
import { Console } from "console";

interface DataType<T> {
  data: T;
  message: string;
  count?: number;
}

interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  user: {
    name: string;
    email: string;
  };
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}
// interface OrderType {
//   orderItems: []
// }

// @desc: Create new order
// @route GET /api/v1/orders
// @access: Private
export const addOrdersItems: RequestHandler = async (req: any, res, next) => {
  
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    const order = new Order({
     
      orderItems: orderItems && orderItems.map((x: any) => ({
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
  } catch (error) {
   
    next(error); // Pass the error to the error handling middleware
  }
};

// @desc: Get order by id
// @route GET /api/v1/orders/myorders
// @access: Private
export const getMyOrders: RequestHandler = async (req: any, res, next) => {
  try {
    const orders = await Order.findById({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    next(error); // Pass the error to the next middleware for proper error handling
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
  try {
    // updating current order
    const order = await Order.findById(req.params.id);
    if (order)
    {
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address
      }
      const updateOrder = await order.save();
  
      res.status(200).json(updateOrder);
    }
    else {
      res.status(404);
      throw new Error('Order not found');
    }
  }
  catch {

  }

  // it will change the status to paid from not paid 
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
    try {
        const orders = await Order.find();
        const responseData = {
            count: orders.length,
            data: orders,
            message: 'success'
        };
        res.json(responseData);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
