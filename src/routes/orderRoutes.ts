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
OrderRouter.post("/", addOrdersItems);
// Orders with admin middleware
OrderRouter.use(admin, protect);
OrderRouter.get("/", getAllOrders);
OrderRouter.get("/:id", getOrderById);
// Routes uses only protect middleware
OrderRouter.use(protect);
OrderRouter.put("/:id/pay", updateOrderToPaid);
OrderRouter.put("/:id/deliver", updateOrderToDelivered);
OrderRouter.get("/mine", getMyOrders);

export default OrderRouter;
