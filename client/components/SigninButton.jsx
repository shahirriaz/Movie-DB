import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig/authConfig";

function handleLogin(instance) {
  instance.loginRedirect(loginRequest).catch((e) => {
    console.error(e);
  });
}

//Todo: Implement google here

export const SignInButton = ({ as }) => {
  const { instance } = useMsal();

  return (
    <button
      onClick={() => handleLogin(instance)}
      className="bg-transparent text-blue-700 font-semibold hover:text-white py-2 px-4 border  rounded"
    >
      Sign in as {as}
    </button>
  );
};
