import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  addOrdersItems,
  getMyOrders
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
OrderRouter.use(protect);
OrderRouter.put("/:id/deliver", updateOrderToDelivered);
OrderRouter.use(protect);
OrderRouter.get("/mine", getMyOrders);

export default OrderRouter;
