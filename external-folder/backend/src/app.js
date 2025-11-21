import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.route.js'
import carRoutes from './routes/car.route.js'
const app = express();

// app.set('view engine', 'ejs');
// app.set('views', "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Routes
app.use("/api/auth", authRoute);
app.use("/api/cars", carRoutes);
export default app;