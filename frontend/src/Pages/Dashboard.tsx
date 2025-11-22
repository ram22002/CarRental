import { useEffect, useState } from "react";
import { getMyCars } from "../API/api";
import CarCard from "../components/CarCard";
import type { Car } from "./Home";

const Dashboard = () => {
  const [myCars, setMyCars] = useState<Car[]>([]);

  const fetchMyCars = async () => {
    try {
      const cars = await getMyCars();
      setMyCars(cars);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyCars();
  }, []);

  const handleDelete = async () => {
    // After a car is deleted, we re-fetch the list of cars to update the UI
    fetchMyCars();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">My Cars</h1>
      {myCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myCars.map((car) => (
            <CarCard key={car._id} car={car} isMyCar={true} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p>You have not listed any cars yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
