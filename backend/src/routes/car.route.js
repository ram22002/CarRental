import express from "express";
import { addCar, buyCar } from "../controllers/car.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Add a car (Login required)
router.post("/add", auth, addCar);

// Buy a car (Login required)
router.post("/buy/:id", auth, buyCar);

export default router;
