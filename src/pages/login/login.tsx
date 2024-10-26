import { Input } from "@/components/ui/input";
import { useAuth } from "@/constants/AuthContext";
import { Eye, Loader2, Mail } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [input, setInput] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.email && input.password.length >= 6) {
            try {
                setIsLoading(true);
                await login(input.email, input.password);
                navigate("/dashboard");
            } catch (err) {
                setError("Login failed. Please check your credentials.");
            } finally {
                setIsLoading(false);
            }
        } else {
            setError(
                "Please provide a valid email and a password with at least 6 characters."
            );
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left side with wave design */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-white overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        alt=""
                        src="/login-bg.svg"
                        className="h-full object-cover border-2"
                    />
                </div>
            </div>

            {/* Right side with login form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome to our website
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Welcome, We are very proud that you are thinking
                            about creating an account. We hope you find the best
                            services within our platform, thanks for choosing
                            us!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <div className="relative">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={handleInput}
                                    placeholder="Email@example.com"
                                    className="w-full bg-white border-gray-200 text-gray-900 pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            </div>

                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={input.password}
                                    onChange={handleInput}
                                    placeholder="Password"
                                    className="w-full bg-white border-gray-200 text-gray-900 pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer" />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                                {error}
                            </p>
                        )}

                        <div className="space-y-3 pt-2">
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full active:scale-95 transition-all disabled:opacity-80 hover:bg-stone-900 flex items-center justify-center bg-stone-800  text-white py-[10px] rounded-md ">
                                Login{" "}
                                {isLoading && (
                                    <span className="scale-75 ml-1">
                                        <Loader2 className="animate-spin " />
                                    </span>
                                )}
                            </button>

                            <button
                                type="button"
                                className="w-full bg-white hover:bg-gray-50 text-gray-900 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 border border-gray-200">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span>Login with Google</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
