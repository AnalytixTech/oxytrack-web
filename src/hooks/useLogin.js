// src/hooks/auth/useLogin.js
import React from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/auth/useAuth";

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
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // Store the token and user data
      login(data.token, data.user);
      navigate({ to: "/home" });
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
