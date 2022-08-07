import { useLoading } from "../utils/UseLoading";
import { fetchJSON } from "../utils/FetchJSON";

export function Profile() {
  const { loading, data, error } = useLoading(async () => {
    return await fetchJSON("/api/login");
  });
  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile for {data?.userInfo.name}</h1>
      <img src={data.userInfo.picture} alt="" />
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
