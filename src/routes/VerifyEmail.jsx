import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/auth/useAuth";

const VerifyEmail = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { verifyEmail, resendOtp } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await verifyEmail(formData.email, formData.otp);
      setMessage("Email verified successfully! You can now log in.");
    } catch (err) {
      setError(err.message || "Email verification failed.");
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setMessage("");
    try {
      await resendOtp(formData.email);
      setMessage("New OTP sent to your email.");
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-10 text-4xl">Oxytrack</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Verify Your Email
        </h2>
        {error && (
          <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </p>
        )}
        {message && (
          <p className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
            {message}
          </p>  
        )}
        <form onSubmit={handleVerify}>
          <div className="mb-4">  
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2"
            >
              Email Address
            </label>  
            <input
              type="email"
              id="email"  
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300 rounded-md p-2 focus-within:border-[#0097b2] outline-none"
            />  
          </div>
          <div className="mb-4">  
            <label
              htmlFor="otp" 
              className="block text-gray-700 mb-2"
            >
              One-Time Password (OTP)
            </label>  
            <input
              type="text"
              id="otp"  
              name="otp"
              value={formData.otp}  
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300 rounded-md p-2 focus-within:border-[#0097b2] outline-none"
            />  
          </div>  
          <button
            type="submit"
            className="w-full bg-[#0097b2] text-white py-2 rounded-md hover:bg-[#007a8c] transition-colors"
          >
            Verify Email
          </button>
        </form>
        <button
          onClick={handleResendOtp}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >   

          Resend OTP
        </button>  
        <p className="mt-4 text-center text-sm text-gray-600">  
          Remembered your password?{" "}
          <Link to="/login" className="text-[#0097b2] hover:underline">
            Log In  
          </Link>
        </p>  
      </div>  
    </div>  
  );  
};
export default VerifyEmail;

