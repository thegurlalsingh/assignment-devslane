import SignupForm from "./signup";
import { useNavigate } from "react-router-dom";
import React from "react";

const SignupPagePrivate = () => {
  const navigate = useNavigate();
  return <SignupForm navigate={navigate} />;
};
export default SignupPagePrivate;