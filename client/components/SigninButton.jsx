import React, { useCallback, useState } from "react";
import { useAuth } from "../hooks/use-auth";

export const SignInButton = ({
  textColor = "text-white",
  provider,
  btnTxt = "Sign in",
}) => {
  const { handleGoogleLogin, handleMicrosoftLogin, msalInstance } = useAuth();

  const handleLogin = async (provider) => {
    switch (provider) {
      case "google":
        await handleGoogleLogin(provider);
        break;
      case "microsoft":
        await handleMicrosoftLogin(msalInstance);
    }
  };

  return (
    <button
      onClick={() => handleLogin(provider)}
      className={`bg-transparent ${textColor} font-semibold hover:${textColor} py-2 px-4 border  rounded-2xl`}
    >
      <a>{btnTxt}</a>
    </button>
  );
};
