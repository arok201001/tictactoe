import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormInputs = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormInputs>();

const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("Valid Data:", data);
};

const password = watch("password", "");


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Username</label>
                <input 
                type="text"
                {...register("username", {
                    required: "Username is required",
                    minLength: {
                        value: 5,
                        message: "Username must be at least 5 character long"
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Username can only contain letters and numbers"
                    }
                })} />
                {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div>
                <label>Email</label>
                <input 
                type="email"
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address"
                    }
                    })} />
                    {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label>Password</label>
                <input 
                type="password"
                {...register("password", {
                    required: "Password is required",
                    pattern: {
                        value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                        message: "Password must be at least 8 characters long and include at least on number and one special character"

                    }
                    })} />
                    {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
                <label>Confirm Password</label>
                <input 
                type="password"
                {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) => value === password || "Passwords do not match"
                })} />

                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit">Register</button>


        </form>
    )



    }
