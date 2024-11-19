import { Client } from "@microsoft/microsoft-graph-client";


export const getGraphClient = (accessToken: string): Client => {
    return Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        },
    });
};

export const fetchCalendarEvents = async (accessToken: string) => {
    const client = getGraphClient(accessToken);
    return await client.api("/me/events").get();
};
