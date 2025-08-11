import React from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const loginUser = async (credentials) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    credentials,
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
};
const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      throw new Error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    },
  });
};

export default useLogin;
