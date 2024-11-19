import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { fetchCalendarEvents } from "./graphClient";
import Calendar from "./composants/Calendar";
import WebViewer from "./composants/web";
import './App.css';

type Event = {
    subject: string;
    start: {
        dateTime: string;
    };
};

const App: React.FC = () => {
    const { instance, accounts } = useMsal();
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await instance.acquireTokenSilent({
                    scopes: ["Calendars.Read"],
                    account: accounts[0],
                });
                const eventsData = await fetchCalendarEvents(response.accessToken);
                setEvents(eventsData.value);
            } catch (error) {
                if (error instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenPopup({
                        scopes: ["Calendars.Read"],
                    });
                }
            }
        };

        if (accounts.length > 0) {
            getToken();
        }
    }, [instance, accounts]);

    return (
        <div id="root">
            <div className="container">
                <div className="calendar">
                    <Calendar events={events.map((e) => ({ title: e.subject, start: e.start.dateTime }))} />
                </div>
                <div className="web-viewer">
                    <WebViewer url="https://assistance.audencia.com/front/ticket.php?is_deleted=0&as_map=0&browse=0&savedsearches_id=42&itemtype=Ticket&sort[0]=19&order[0]=DESC&reset=reset&criteria[0][link]=AND&criteria[0][field]=12&criteria[0][searchtype]=equals&criteria[0][value]=notold&criteria[1][link]=AND&criteria[1][field]=8&criteria[1][searchtype]=equals&criteria[1][value]=mygroups&criteria[2][link]=OR&criteria[2][field]=5&criteria[2][searchtype]=equals&criteria[2][value]=myself&criteria[3][link]=AND&criteria[3][field]=12&criteria[3][searchtype]=equals&criteria[3][value]=notold" />
                </div>
            </div>
        </div>
    );
};

export default App;