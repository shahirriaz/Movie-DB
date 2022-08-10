import { SignInButton } from "../components/SigninButton";
import { useLocation } from "react-router-dom";

export function LoginDirect() {
  const {
    state: { from },
  } = useLocation();

  const renderSignInBtn = () => {
    switch (from) {
      case "admin":
        return (
          <SignInButton
            btnTxt="Sign in with Microsoft"
            textColor="text-black"
            provider="microsoft"
          />
        );
      case "movies":
        return (
          <SignInButton
            btnTxt="Sign in with Google"
            textColor="text-black"
            provider="google"
          />
        );
    }
  };

  return (
    <div className="">
      <div className="w-full h-screen">
        <div className="w-full h-full flex flex-col justify-center items-center backdrop-blur-lg">
          <h3 className="text-2xl text-orange-400 mb-2">
            {from === "movies"
              ? "You must log in to read"
              : "This page is only for admins"}
          </h3>
          {renderSignInBtn()}
        </div>
      </div>
    </div>
  );
}
