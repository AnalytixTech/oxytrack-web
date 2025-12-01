import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import useRegister from "../hooks/useRegister";
import { FaEyeSlash, FaEye } from "react-icons/fa6";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { mutate: register, isPending } = useRegister();

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

  const handleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    register(
      {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
      {
        onError: (error) => {
          setError(error.message || "Registration failed. Please try again.");
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-10 text-4xl">Oxytrack</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>
        {error && (
          <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full border-2 border-gray-300  rounded-md p-2  focus-within:border-[#0097b2] outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full border-2 border-gray-300  rounded-md p-2  focus-within:border-[#0097b2] outline-none"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
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
                minLength="6"
              />
              <button type="button" onClick={handlePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className=" flex justify-between items-center mt-1 border-2 border-gray-300 rounded-md p-2 focus-within:border-[#0097b2]">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
              <button type="button" onClick={handleConfirmPassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#0097b2] text-white p-3 rounded-md hover:bg-[#0097b2] transition disabled:bg-[#0097b2] disabled:cursor-not-allowed"
          >
            {isPending ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/" className="text-[#0097b2]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
