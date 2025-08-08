import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import useRegister from "../hooks/useRegister";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
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
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isPending ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
