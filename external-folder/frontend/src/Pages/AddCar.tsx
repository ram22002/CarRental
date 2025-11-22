// src/pages/AddCar.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCarAPI } from "../API/api";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const AddCar: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    kmDriven: "",
    fuelType: "",
    transmission: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!form.brand || !form.model || !form.price) {
      alert("Brand, model, and price are required");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title || `${form.brand} ${form.model}`);
    fd.append("brand", form.brand);
    fd.append("model", form.model);
    fd.append("year", form.year);
    fd.append("price", form.price);
    fd.append("kmDriven", form.kmDriven);
    fd.append("fuelType", form.fuelType);
    fd.append("transmission", form.transmission);

    images.forEach((file) => fd.append("images", file));

    setLoading(true);
    try {
      await addCarAPI(fd);
      alert("Car added successfully");
      navigate("/");
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Add car failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-muted p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Add a Car</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input placeholder="Title (optional)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <Input placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
        <Input placeholder="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
        <Input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
        <Input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <Input placeholder="KM Driven" value={form.kmDriven} onChange={(e) => setForm({ ...form, kmDriven: e.target.value })} />
        <Input placeholder="Fuel Type" value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })} />
        <Input placeholder="Transmission" value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} />

        <div>
          <label className="block text-sm mb-1">Images</label>
          <input multiple accept="image/*" type="file" onChange={handleImageChange} />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Car"}
        </Button>
      </form>
    </div>
  );
};

export default AddCar;
