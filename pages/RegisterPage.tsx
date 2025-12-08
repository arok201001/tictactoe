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
                <label>Användarnamn</label>
                <input 
                type="text"
                {...register("username", {
                    required: "Användarnamn är obligatoriskt",
                    minLength: {
                        value: 5,
                        message: "Användarnamnet måste innehålla minst 5 tecken"
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Användarnamnet får endast innehålla bokstäver och siffror"
                    }
                })} />
                {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div>
                <label>E-post</label>
                <input 
                type="email"
                {...register("email", {
                    required: "E-post är obligatoriskt",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Ange en giltig e-postadress"
                    }
                    })} />
                    {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label>Lösenord</label>
                <input 
                type="password"
                {...register("password", {
                    required: "Lösenord är obligatoriskt",
                    pattern: {
                        value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                        message: "Lösenordet måste innehålla minst 8 tecken, minst en siffra och ett specialtecken"

                    }
                    })} />
                    {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
                <label>Bekräfta Lösenord</label>
                <input 
                type="password"
                {...register("confirmPassword", {
                    required: "Bekräfta ditt lösenord",
                    validate: (value) => value === password || "Lösenorden matchar inte"
                })} />

                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit">Registrera</button>


        </form>
    )



    }
