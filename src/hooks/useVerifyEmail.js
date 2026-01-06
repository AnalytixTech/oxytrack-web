import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

const verifyEmail = async ({ email, otp }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/verify-email`,
    { email, otp },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

// const resendOtp = async (email) => {
//   const response = await axios.post(
//     `${import.meta.env.VITE_API_URL}/api/auth/resend-otp`,
//     { email },
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
//   );
//   return response.data;
// };

const useVerifyEmail = () => {
  const navigate = useNavigate();

  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      console.log("Email verification successful:", data);
      navigate({ to: "/login",
        state: {
          message: "Email verified successfully. Please log in."
        }
      });
    },
    onError: (error) => {
      console.error("Email verification error:", error);
      throw new Error(
        error.response?.data?.message ||
          "Email verification failed. Please try again.",
      );
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      console.log("OTP resend successful:", data);
      // Optionally, you can show a toast or message to the user
    },
    onError: (error) => {
      console.error("OTP resend error:", error);
      throw new Error(
        error.response?.data?.message || "Failed to resend OTP. Please try again.",
      );
    },
  });

  return { verifyEmailMutation, resendOtpMutation };
};

export default useVerifyEmail;
