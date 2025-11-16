import { Car } from "../models/car.model.js";

export const addCar = async (req, res) => {
  try {
    const owner = req.user.id;

    const car = await Car.create({ ...req.body, owner });

    res.json({ message: "Car added successfully", car });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const buyCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const buyerId = req.user.id;

    const car = await Car.findById(carId).populate("owner");

    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.isSold) return res.status(400).json({ message: "Car already sold" });

    car.isSold = true;
    car.buyer = buyerId;
    await car.save();

    res.json({
      message: "Car purchased successfully",
      ownerDetails: {
        name: car.owner.name,
        email: car.owner.email,
        phone: car.owner.phone
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
