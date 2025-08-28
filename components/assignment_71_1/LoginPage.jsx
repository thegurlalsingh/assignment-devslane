import LoginForm from "./login";
import { useNavigate } from "react-router-dom";
import React from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  return <LoginForm navigate={navigate} />;
};
export default LoginPage;