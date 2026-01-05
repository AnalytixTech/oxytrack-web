import React from 'react'
import axios from 'axios';

const verifyEmailOtp = async ({email, otp}) => {
const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-email`, 
    { email, otp},
{
    headers: { 
        "Content-Type": "application/json" },

    },
);
return response.data;
}

const resendOtp = async (email) => {
const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resend-verification-email`, 
    { email },
{
    headers: { 
        "Content-Type": "application/json" },   
        
}

const resendVerificationEmail = async (email) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resend-verification-email`, 
        { email },

export default useVerifyEmail