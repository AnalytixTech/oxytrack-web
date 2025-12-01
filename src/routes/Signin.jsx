import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
import { FaEyeSlash, FaEye } from "react-icons/fa6";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { mutate: login, isPending } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Username and password are required.");
      return;
    }
    login(formData, {
      onError: (error) => {
        setError(error.message || "Login failed. Please try again.");
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-10 text-4xl">Oxytrack</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>
        {error && (
          <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full border-2 border-gray-300  rounded-md p-2  focus-within:border-[#0097b2] outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className=" flex justify-between items-center mt-1 border-2 border-gray-300 rounded-md p-2 focus-within:border-[#0097b2]">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className=" w-full focus:outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={handlePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#0097b2] text-white p-3 rounded-md hover:[#0097b2] transition disabled:bg-[#0097b2] disabled:cursor-not-allowed"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="text-center mt-4">
          Dont have an account ?{" "}
          <Link to="/signup" className="text-[#0097b2] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
