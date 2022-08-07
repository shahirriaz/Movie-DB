export function config() {
  return (req, res) => {
    res.json({
      response_type: "token",
      client_id:
        "946080345339-uhfncmu533tmardmeiiauepicqe3prlo.apps.googleusercontent.com",
      discovery_endpoint:
        "https://accounts.google.com/.well-known/openid-configuration",
    });
  };
}
