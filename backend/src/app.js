import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.route.js'
import carRoutes from './routes/car.route.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static(uploadsDir));


// Routes
app.use("/api/auth", authRoute);
app.use("/api/cars", carRoutes);
export default app;