import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useForms } from "../hooks/useForms";
import useAuthStore from "../store/authStore";
import Alert from "../components/custom/Alert";

const SignUp: React.FC = () => {
  const [errors, setErrors] = useState<{
    name: boolean;
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
    name: false,
  });
  const token = useAuthStore((state) => state.token);
  const navigation = useNavigate();

  useEffect(() => {
    if (token) {
      navigation("/dashboard");
    }
  }, [token]);

  const { register, handleSubmit } = useForm();

  const mutation = useForms("/api/users/register", "register");

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <motion.div
        initial={{
          scale: 0.5,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          stiffness: 100,
          type: "spring",
          duration: 1,
          ease: "easeIn",
        }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex justify-center h-36">
          <img src={Logo} alt="Logo" className="h-48" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">
          Sign up for an account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">Name is required.</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid email.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true, minLength: 6 })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                Password must be at least 6 characters.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Authenticating..." : "Sign up"}
          </button>
        </form>

        {mutation.data?.message && (
          <Alert color="red" status="" msg={mutation.data?.message} />
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
