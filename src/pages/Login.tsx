import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { instance } from "../base/interceptor";
import { AxiosResponse } from "axios";
import Alert from "../components/custom/Alert";
import useAuthStore from "../store/authStore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const setToken = useAuthStore((state) => state.setToken);
  const navigation = useNavigate();

  const [errors, setErrors] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  const onSubmit = (data: FieldValues) => {
    mutate(data);
  };
  const { data, mutate, isPending, isError, error, status } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: FieldValues) => {
      const res = await instance
        .post("/api/users/login", data)
        .then((data) => {
          if (data.data?.token) {
            Cookies.set("token", data.data?.token, {
              expires: 1000 * 60 * 60 * 24 * 2,
              secure: true,
            });
            setToken(data.data?.token);
            navigation("/dashboard");
          }else{
            data.data.message
          }
        })
        .catch((err) => err.message);
      return res;
    },
  });

  console.log({ data, error, status });

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
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                {...register("rememberMe")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          {isError && <Alert msg={error.message} color="red" status={status} />}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isPending}
          >
            {!isPending ? "Sign in" : "Authenticating"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Create new account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
