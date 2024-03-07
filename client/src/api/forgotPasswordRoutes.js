import axios from "axios";
import { resetPassword, sentOtp, verifyOtp } from "./forgotPasswordUri";
export const sendOtpMessage = async(email) => {
    try {
        const { data } = await axios.post(`${sentOtp}`, {email});
        return data;
      } catch (error) {
        console.log(error.response.data);
        return error.response.data;
      }
};

export const verifyOtpMessage = async(email,otp) => {
    try {
        const { data } = await axios.post(`${verifyOtp}`, { email, otp });
        return data;
      } catch (error) {
        console.log(error.response.data);
        return error.response.data;
      }
}

export const resetUserPassword = async(email,newPassword) => {
    try {
        const { data } = await axios.post(`${resetPassword}`, { email, newPassword });
        return data;
      } catch (error) {
        console.log(error.response.data);
        return error.response.data;
      }
}