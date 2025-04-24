import React from "react";
import SignupForm from "../components/SignupForm.tsx";
import '../styles/main.css';

const SignupPage: React.FC = () => {
  return (
    <div className="signup-container">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
