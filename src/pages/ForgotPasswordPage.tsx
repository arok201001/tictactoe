import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import TextInput from "../components/TextInput";
import Button from "../components/Button";

import symbol from "../assets/symbol.png";
import envelope from "../assets/envelope-icon.png";

type FormInputs = {
    email: string;
};

export default function ForgotPasswordPage() {
    const { forgotPassword, loading } = useAuth();
    
    const [apiError, setApiError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setApiError(null);
        setSuccessMessage(null);
        try {
            await forgotPassword(data.email);
            setSuccessMessage("If an account exists, a reset link has been sent.");
        } catch (error) {
            console.error(error);
            setApiError("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center bg-[#152034] p-5 rounded-xl w-[400px] max-w-full mx-auto my-10 shadow-lg">
            
            <img src={symbol} alt="Logo" className="h-14 mb-2" />
            <h1 className="text-white text-3xl mt-3">RESET PASSWORD</h1>
            <h3 className="text-[#8d9db5] mt-1 text-sm mb-6 text-center">
                Enter your email to receive a reset link
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
                
                {apiError && (
                    <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded text-sm mb-4 w-full text-center">
                        {apiError}
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-2 rounded text-sm mb-4 w-full text-center">
                        {successMessage}
                    </div>
                )}

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
                        <p className="text-red-400 text-xs pl-1 -mt-3 mb-2">{errors.email.message}</p>
                    )}
                </div>

                <Button type="submit" disabled={loading || !!successMessage}>
                    {loading ? "SENDING..." : "SEND LINK ➔"}
                </Button>

            </form>

            <p className="text-[#8d9db5] text-sm flex gap-1 mt-6">
                Remembered your password?
                <NavLink to={"/login"}>
                    <span className="text-[#00cedd] text-sm cursor-pointer hover:underline">
                        Sign In
                    </span>
                </NavLink>
            </p>
        </div>
    );
}