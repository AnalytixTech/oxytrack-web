import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

const registerUser = async (userData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/register`,
    userData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      navigate({ to: "/verify-email",
        state: { 
          email: data.user?.email || data.email,
          message: "Please verify your email to complete registration."
        }
       });
    },
    onError: (error) => {
      console.error("Registration error:", error);
      return (
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    },
  });
};

export default useRegister;
