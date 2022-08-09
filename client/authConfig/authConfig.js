export const msalConfig = {
  auth: {
    clientId: "13b6d2f2-0298-4046-a943-974591b209ec",
    authority:
      "https://login.microsoftonline.com/412aafd1-af78-48e9-b802-000c693c24d9", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: window.location.origin + "/login/microsoft/callback",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
