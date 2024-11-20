import React, { createContext, useContext, useState } from "react";
import { apiInstance } from "../lib/axios";

interface AuthContextType {
    user: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(localStorage.getItem("token")); 

    const login = async (email: string, password: string) => {
        try {
            const response = await apiInstance.post("/auth/loginAdmin", {
                email,
                password,
            });

            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                setUser(response.data.token);
                console.log("Login successful:", response.data.token); 
            } else {
                console.error("No token found in response");
                throw new Error("No token received from API");
            }
        } catch (error) {
            console.error("Login failed", error);
            throw new Error("Login failed"); 
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
