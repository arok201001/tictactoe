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

        <div className="flex flex-col justify-center items-center bg-[#152034] p-5 rounded-xl max-w-90 mx-auto shadow-lg">
            

            <img src={symbol} alt="Logo" className="h-14" />
            
            <h1 className="text-white text-3xl mt-3">RESET PASSWORD</h1>

            <h3 className="text-[#8d9db5] mt-1 text-sm text-center">
                Enter your email to receive a reset link
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mt-7">
                
                {apiError && (
                    <div className="w-80 bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded text-sm mb-4 text-center">
                        {apiError}
                    </div>
                )}

                {successMessage && (
                    <div className="w-80 bg-green-500/20 border border-green-500 text-green-200 px-4 py-2 rounded text-sm mb-4 text-center">
                        {successMessage}
                    </div>
                )}

                <div className="w-80">
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