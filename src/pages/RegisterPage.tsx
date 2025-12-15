import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import TextInput from "../components/TextInput";
import Button from "../components/Button";

import symbol from "../assets/symbol.png";
import envelope from "../assets/envelope-icon.png";
import lock from "../assets/lock-icon.png";

type FormInputs = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterPage() {
    const { register: registerUser, loading } = useAuth();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setApiError(null);
        try {
            await registerUser(data.username, data.email, data.password);
            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error);
            setApiError("Registration failed. Username or email might be taken.");
        }
    };

    const password = watch("password", "");

    return (
        <div className="flex flex-col justify-center items-center bg-[#152034] p-5 rounded-xl max-w-90 mx-auto shadow-lg">
            
            <img src={symbol} alt="Logo" className="h-14" />
            
            <h1 className="text-white text-3xl mt-3">SIGN UP</h1>
            <h3 className="text-[#8d9db5] mt-1 text-sm">
                Sign up and start playing
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center mt-7">
                
                {apiError && (
                    <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded text-sm mb-4 w-full text-center">
                        {apiError}
                    </div>
                )}

                <div className="w-full">
                    <label className="text-xs text-[#8d9db5] text-left block mb-1 uppercase pl-1">
                        Username
                    </label>
                    <TextInput 
                        placeholder="Choose a username"
                        iconSrc={envelope} 
                        iconAlt="user"
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message: "Min 5 characters"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "Letters and numbers only"
                            }
                        })} 
                    />
                    {errors.username && (
                        <p className="text-red-400 text-xs m-1 mb-3">{errors.username.message}</p>
                    )}
                </div>

                <div className="w-full">
                    <label className="text-xs text-[#8d9db5] text-left block mb-1 uppercase pl-1">
                        Email
                    </label>
                    <TextInput 
                        placeholder="Enter your email"
                        iconSrc={envelope}
                        iconAlt="envelope"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address"
                            }
                        })} 
                    />
                    {errors.email && (
                        <p className="text-red-400 text-xs m-1 mb-3">{errors.email.message}</p>
                    )}
                </div>

                <div className="w-full">
                    <label className="text-xs text-[#8d9db5] text-left block mb-1 uppercase pl-1">
                        Password
                    </label>
                    <TextInput 
                        placeholder="Create a password"
                        iconSrc={lock}
                        iconAlt="lock"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                                message: "Min 8 chars, 1 number, 1 special char"
                            }
                        })} 
                    />
                    {errors.password && (
                        <p className="text-red-400 text-xs m-1 mb-3">{errors.password.message}</p>
                    )}
                </div>

                <div className="w-full">
                    <label className="text-xs text-[#8d9db5] text-left block mb-1 uppercase pl-1">
                        Confirm Password
                    </label>
                    <TextInput 
                        placeholder="Repeat password"
                        iconSrc={lock}
                        iconAlt="lock"
                        type="password"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) => value === password || "Passwords do not match"
                        })} 
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-400 text-xs m-1 mb-3">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "CREATING ACCOUNT..." : "SIGN UP ➔"}
                </Button>

            </form>

            <p className="text-[#8d9db5] text-sm flex gap-1 mt-2">
                Already have an account?
                <NavLink to={"/login"}>
                    <span className="text-[#00cedd] text-sm cursor-pointer hover:underline">
                        Sign In
                    </span>
                </NavLink>
            </p>
        </div>
    );
}