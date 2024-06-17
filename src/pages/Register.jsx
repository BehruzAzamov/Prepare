import { Link, Form, useActionData } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";


export const action = async ({ request }) => {
  let formData = await request.formData();
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");
  let email = formData.get("email");
  let password = formData.get("password");
  return { displayName, photoURL, email, password };
};

function Signup() {
  const data = useActionData();
  const { registerWithGoogle, register } = useRegister();
  useEffect(() => {
    if (data) {
      register(data);
    }
  }, [data]);
  return (
    <div className="h-screen grid place-content-center">

      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 opacity-85 shadow-lg flex flex-col gap-y-3"
      >
        <h4 className="text-center font-bold text-3xl">Register</h4>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">Display name</span>
          </div>
          <input
            type="text"
            name="displayName"
            placeholder="Type here"
            className="input input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full mb-3">
      <div className="label">
        <span className="label-text">IMG URL:</span>
      </div>
      <input
        type="url"
        name="photoURL"
        placeholder="Type here"
        className="input input-bordered w-full"
        required
      />
    </label>
    <label className="form-control w-full mb-3">
      <div className="label">
        <span className="label-text">Email:</span>
      </div>
      <input
        type="email"
        name="email"
        placeholder="Type here"
        className="input input-bordered w-full"
        required
      />
    </label>
    <label className="form-control w-full mb-3">
      <div className="label">
        <span className="label-text">Password</span>
      </div>
      <input
        type="password"
        name="password"
        placeholder="Type here"
        className="input input-bordered w-full"
        required
      />
    </label>
        <button className=" mt-2 btn btn-primary btn-block capitalize">
          Sign up 
        </button>
        <button
          onClick={registerWithGoogle}
          className="btn text-white w-full bg-black border-none "
        >
          <FcGoogle className="text-3xl" />
          <span className="text-2xl">Google</span>
        </button>

        <p className="text-center">
          <Link to="/signin" className="btn btn-secondary btn-block capitalize">
            I have an account
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Signup;