import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode, // Use type-only import
} from "react";
import { loginUser, registerUser } from "../API/api";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Load user + token from localStorage on refresh
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
    }, []);

    // ---------------------------
    // LOGIN FUNCTION
    // ---------------------------
    const login = async (email: string, password: string) => {
        setLoading(true);

        const data = await loginUser({ email, password });

        setUser(data.user);
        setToken(data.token);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        setLoading(false);
    };

    // ---------------------------
    // REGISTER FUNCTION
    // ---------------------------
    const register = async (name: string, email: string, password: string) => {
        setLoading(true);

        const data = await registerUser({ name, email, password });

        setUser(data.user);
        setToken(data.token);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        setLoading(false);
    };

    // ---------------------------
    // LOGOUT FUNCTION
    // ---------------------------
    const logout = () => {
        setLoading(true);

        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setLoading(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
};
