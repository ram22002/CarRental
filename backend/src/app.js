import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.route.js'
import carRoutes from './routes/car.route.js'
import fs from 'fs';

const app = express();

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static('uploads'));


// Routes
app.use("/api/auth", authRoute);
app.use("/api/cars", carRoutes);
export default app;