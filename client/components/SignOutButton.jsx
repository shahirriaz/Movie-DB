import React, from "react";

import { useAuth } from "../hooks/use-auth";

export const SignOutButton = ({ textColor = "text-white", btnTxt, provider, }) => {
  const { handleMicrosoftLogout, handleGoogleLogout, msalInstance } = useAuth();

  const handleLogout = async (provider) => {
    switch (provider) {
      case "google":
        await handleGoogleLogout();
        break;
      case "microsoft":
        await handleMicrosoftLogout(msalInstance);
    }
  };

  return (
    <button
      onClick={() => handleLogout(provider)}
      className={`bg-transparent ${textColor} font-semibold hover:${textColor} py-2 px-4 border  rounded-2xl`}
    >
      {btnTxt}
    </button>
  );
};
