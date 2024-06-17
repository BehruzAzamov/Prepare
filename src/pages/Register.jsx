import { Link, Form } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Register() {
  const { registerWithGoogle, register } = useRegister();
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
    email: "",
    password: "",
  });


  const handleFormSubmit = (e) => {
    e.preventDefault();
    register(formData);
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
        <h4 className="text-center font-bold text-3xl">Register</h4>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          name="displayName"
          value={formData.displayName}
          onChange={handleInputChange}
          placeholder="User Name"
        />
        <input
          className="input input-bordered w-full max-w-xs"
          type="url"
          name="photoURL"
          value={formData.photoURL}
          onChange={handleInputChange}
          placeholder="https://photoURL.com"
        />
        <input
          className="input input-bordered w-full max-w-xs"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="test@gmail.com"
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
          Register
        </button>
        <button
          onClick={registerWithGoogle}
          className="btn btn-primary w-full mb-5"
        >
          <span className="text-2xl">Google</span>
        </button>
        <p className="text-center text-xl">
          Already a member?{" "}
          <Link to="/login" className="capitalize link">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Register;
