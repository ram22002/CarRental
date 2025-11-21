// src/pages/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Register: React.FC = () => {
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!form.name || !form.email || !form.password) {
            setError("All fields required");
            return;
        }
        try {
            await register(form.name, form.email, form.password);
            navigate("/");
        } catch (err: any) {
            setError(err?.message || "Register failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-muted p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Create account</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Full name" value={form.name} name="name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Email" value={form.email} name="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input placeholder="Password" type="password" value={form.password} name="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating..." : "Sign up"}
                </Button>
            </form>
        </div>
    );
};

export default Register;
