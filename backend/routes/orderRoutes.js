import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calcTotalSales,
  calcTotalSalesByDate,
  fetchOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";

import { authenticate, authAdmin } from "../middlewares/authMid.js";

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authAdmin, getAllOrders);

router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales-").get(calcTotalSales);
router.route("/total-sales-by-date").get(calcTotalSalesByDate);

router.route("/:id").get(authenticate, fetchOrderById);
router.route("/:id/pay").put(authenticate, markOrderAsPaid);
router.route("/:id/deliver").put(authenticate, authAdmin, markOrderAsDelivered);

export default router;
