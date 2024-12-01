import express from "express";
const router = express.Router();

import { authenticate, authAdmin } from "../middlewares/authMid.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
  readCategory,
} from "../controllers/categoryController.js";

router.route("/").post(authenticate, authAdmin, createCategory);
router
  .route("/:categoryId")
  .put(authenticate, authAdmin, updateCategory)
  .delete(authenticate, authAdmin, deleteCategory);
router.route("/list").get(listCategories);
router.route("/:id").get(readCategory);

export default router;
