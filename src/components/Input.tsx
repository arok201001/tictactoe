import Input from "../components/Input"; 

<form onSubmit={handleSubmit(onSubmit)}>
  
  <Input
    label="Username"
    type="text"
    error={errors.username?.message}
    {...register("username", { required: "Username is required" })}
  />

  <Input
    label="Password"
    type="password"
    error={errors.password?.message}
    {...register("password", { required: "Password is required" })}
  />

  <button type="submit">Login</button>
</form>