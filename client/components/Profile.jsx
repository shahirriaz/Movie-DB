import { useAuth } from "../hooks/use-auth";

export function Profile() {
  const { user, admin } = useAuth();
  console.log(admin);
  return <div>{JSON.stringify(admin)}</div>;
}
