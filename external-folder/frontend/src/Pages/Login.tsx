// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Login: React.FC = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await login(form.email, form.password);

            navigate("/");
        } catch (err: any) {
            setError(err?.message || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-muted p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Login</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    );
};

export default Login;
