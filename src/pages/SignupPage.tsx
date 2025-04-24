import React from "react";
import SignupForm from "../components/SignupForm";

const SignupPage: React.FC = () => {
  return (
    <div className="bg-[#1c0a30] flex justify-center items-center flex-col min-h-screen">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
