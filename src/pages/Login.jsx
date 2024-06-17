import { Form, Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const { signin } = useLogin();
  const { registerWithGoogle } = useRegister();
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    // Optionally add any additional logic here on component mount
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    signin(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen grid place-content-center">
      <Form
        onSubmit={handleFormSubmit}
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center font-bold text-3xl">Login</h4>
        <input
          className="input input-bordered w-full max-w-xs"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="yourgmail@gmail.com"
        />
        <input
          className="input input-bordered w-full max-w-xs"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="00000000"
        />
        <button
          type="submit"
          className="mt-4 btn btn-primary btn-block capitalize"
        >
          Login
        </button>
        <button
          onClick={registerWithGoogle}
          className="btn btn-primary w-full mb-5"
        >
          <span className="text-2xl">Google</span>
        </button>
        <p className="text-center text-xl">
          Not a member yet?{" "}
          <Link to="/register" className="capitalize text-xl link">
            Registration
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;
