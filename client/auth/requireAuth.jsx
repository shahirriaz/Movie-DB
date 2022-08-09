import { useAuth } from "../hooks/use-auth";
import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { PERMISSIONS } from "./permissions";

export const decodeMSToken = () => {
  const microsoftToken = localStorage.getItem("microsoft");
  return microsoftToken && jwt_decode(microsoftToken);
};

const hasPermission = ({ permissions, scopes }) => {
  const scopesMap = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return permissions?.some((permission) => scopesMap[permission]);
};

export function RequireAuth({ children, scopes = [], admin = false }) {
  let location = useLocation();
  const { user } = useAuth();
  const res = decodeMSToken();

  let roles = "";

  if (user && Object.keys(user).length !== 0) {
    roles = user.roles;
  } else if (res !== null) {
    roles = "OWNER";
  }

  const permissions = PERMISSIONS[roles];

  const permissionGranted = hasPermission({ permissions, scopes });

  if (!permissionGranted) {
    return (
      <Navigate to="/login" state={{ from: location.pathname.split("/")[1] }} />
    );
  }

  return children;
}
