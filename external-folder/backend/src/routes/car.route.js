import express from "express";
import { addCar, buyCar, getCars } from "../controllers/car.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/", getCars);

// Add a car (Login required)
router.post("/add", auth,upload.array("images", 10), addCar);

// Buy a car (Login required)
router.post("/buy/:id", auth, buyCar);

export default router;
