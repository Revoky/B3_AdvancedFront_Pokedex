import React from "react";
import SignupForm from "../components/SignupForm";

const SignupPage: React.FC = () => {
  return (
    <div className="bg-[#181818] flex justify-center items-center flex-col min-h-screen p-8">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
