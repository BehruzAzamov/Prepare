import { Form, Link, useActionData } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRegister } from "../hooks/useRegister";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};
function Signin() {
  const data = useActionData();
  const { signin } = useLogin();
  const { registerWithGoogle } = useRegister();
  useEffect(() => {
    if (data) {
      signin(data);
    }
  }, [data]);
  return (
    <div className="h-screen grid place-content-center">
     
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 opacity-85 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center font-bold text-3xl">Login</h4>
        
        <button className=" mt-4 btn btn-primary btn-block capitalize">
          Login
        </button>
        <button
          onClick={registerWithGoogle}
          className="btn text-white w-full bg-black border-none"
        >
          <FcGoogle className="text-3xl" />
          <span className="text-2xl">Google</span>
        </button>
        <p className="text-center">
          <Link
            to="/register"
            className="btn btn-secondary btn-block capitalize"
          >
            I have no account yet
          </Link>
        </p>
      </Form>
    </div>
  );
}
export default Signin;