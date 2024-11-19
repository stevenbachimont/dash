import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: "CLIENT_ID",
        authority: "https://login.microsoftonline.com/TENANT_ID",
        redirectUri: "http://localhost:5173",
    },
};
