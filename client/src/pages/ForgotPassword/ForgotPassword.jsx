import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import {
  resetUserPassword,
  sendOtpMessage,
  verifyOtpMessage,
} from "../../api/forgotPasswordRoutes";

function ForgotPassword() {
  const navigate = useNavigate();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailOtpPassword, setEmailOtpPassword] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if(successMessage === "Password Reset Successfully"){
      navigate("/Auth")
    }
  },[successMessage])

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const { email } = emailOtpPassword;
      const data = await sendOtpMessage(email);
      if (data.message) {
        setSuccessMessage(data.message);
        setShowOtpInput(true);
      } else if (data.error) {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to send OTP. Please try again later.");
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const { email, otp } = emailOtpPassword;
      const data = await verifyOtpMessage(email, otp);
      if (data.message) {
        setSuccessMessage(data.message);
        setShowResetPasswordForm(true);
      } else if (data.error) {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to verify OTP. Please try again later.");
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const { newPassword, confirmNewPassword, email } = emailOtpPassword;
      if (newPassword !== confirmNewPassword) {
        setErrorMessage("passwords do not match");
        return;
      }

      const data = await resetUserPassword(email, newPassword);
      if (data.message) setSuccessMessage(data.message);
      else if (data.error) setErrorMessage(data.error);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to reset password. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h1>Forgot Password</h1>
      <form
        className="form"
        onSubmit={
          showResetPasswordForm
            ? handleResetPassword
            : showOtpInput
            ? handleVerifyOtp
            : handleSendOtp
        }
      >
        <input
          type="email"
          placeholder="Enter Email"
          className="input-field"
          onChange={(e) =>
            setEmailOtpPassword({ ...emailOtpPassword, email: e.target.value })
          }
        />
        {showOtpInput && (
          <input
            type="text"
            placeholder="Enter OTP"
            className="input-field"
            onChange={(e) =>
              setEmailOtpPassword({ ...emailOtpPassword, otp: e.target.value })
            }
          />
        )}
        {showResetPasswordForm && (
          <input
            type="password"
            placeholder="new password"
            className="input-field"
            onChange={(e) =>
              setEmailOtpPassword({
                ...emailOtpPassword,
                newPassword: e.target.value,
              })
            }
          />
        )}
        {showResetPasswordForm && (
          <input
            type="password"
            placeholder="confirm password"
            className="input-field"
            onChange={(e) =>
              setEmailOtpPassword({
                ...emailOtpPassword,
                confirmNewPassword: e.target.value,
              })
            }
          />
        )}
        <input
          type="submit"
          value={
            showOtpInput
              ? "Verify Otp"
              : showResetPasswordForm
              ? "reset password"
              : "Send Otp"
          }
          className="submit-btn"
        />
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <div className="link-container">
        <Link to={"/login"} className="link">
          Remembered your password ? Login here
        </Link>
        <Link to={"/register"} className="link">
          dont have an account register here
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
