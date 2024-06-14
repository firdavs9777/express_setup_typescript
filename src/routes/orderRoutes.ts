import { Router } from "express";
import {
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  addOrdersItems,
} from "../controllers/orderController";
import { admin, protect } from "../middleware/authMiddleware";

const OrderRouter = Router();
/// Orders without any admin or private middleware
OrderRouter.use(protect);
OrderRouter.post("/", addOrdersItems);
// Orders with admin middleware
OrderRouter.use(protect, admin);
OrderRouter.get("/", getAllOrders);

OrderRouter.use(protect);
OrderRouter.get("/:id", getOrderById);
// Routes uses only protect middleware
OrderRouter.use(protect);
OrderRouter.put("/:id/pay", updateOrderToPaid);
OrderRouter.put("/:id/deliver", updateOrderToDelivered);
OrderRouter.get("/myorders", getMyOrders);

export default OrderRouter;