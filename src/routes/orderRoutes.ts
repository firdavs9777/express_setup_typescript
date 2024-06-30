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

OrderRouter.use(protect);
OrderRouter.get("/myorders", getMyOrders);
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


export default OrderRouter;
