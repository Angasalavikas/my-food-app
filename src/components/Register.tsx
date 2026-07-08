import { useForm } from "react-hook-form";
import type { RegisterRequest } from "../Interface/RegisterRequest";
import { servieRegister } from "../services/AuthService";
import "../Register.css";
function Register() {
  const { register, handleSubmit, reset } = useForm<RegisterRequest>();

  const onSubmitLogics = async (data: RegisterRequest) => {
    try {
      const response = await servieRegister(data);

      alert("Registration Successful!");
      console.log(response);

      reset();
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <form
        className="register-form"
        onSubmit={handleSubmit(onSubmitLogics)}
      >
        <h2 className="form-title">Create Account</h2>

        <div className="input-group">
          <input
            type="text"
            {...register("name")}
            placeholder="Enter Username"
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            {...register("email")}
            placeholder="Enter Email"
          />
        </div>

        <div className="input-group">
          <input
            type="number"
            {...register("phone")}
            placeholder="Enter Phone Number"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            {...register("password")}
            placeholder="Enter Password"
          />
        </div>

        <div className="input-group">
          <select {...register("role")}>
            <option value="ROLE_CUSTOMER">Customer</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
        </div>

        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;