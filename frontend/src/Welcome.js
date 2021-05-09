import React, { useState, useEffect } from "react";
import './css/Welcome.css';

function Welcome (props){

    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        // Need to make a call to API endpoint to get all events for the user

        // Example of API data converted to JSON
        // const json = {
        //     "events": [
        //         {
        //             "name" : "Sample Cleanup Event",
        //             "date": new Date(),
        //             "location" : "San Luis Obispo",
        //             "volunteerPreference" : "Office/Remote Volunteer"
        //         },
        //         {
        //             "name" : "Sample Gardening Event",
        //             "date": new Date(),
        //             "location" : "North County",
        //             "volunteerPreference" : "Garden Educator Assistant"
        //         },
        //         {
        //             "name" : "Sample Secial Event",
        //             "date": new Date(),
        //             "location" : "Coastal",
        //             "volunteerPreference" : "Special Events Volunteer"

        //         }
        //     ]
        // };

        // setEventList(json.events);

        // console.log(json.events);

    }, []);

    return(
    <div id='welcome'>

        {/* <header>
            <div class='returnHome'>
                <img src="./logo.svg" height="50" alt="Logo"/>
                <button>RETURN HOME</button>
            </div>

            <h1>Welcome, [VOLUNTEER]</h1>
            <div class='logout'>
                <button>LOG OUT</button>
            </div>
        </header> */}

        <h1>Welcome, [VOLUNTEER]</h1>
        <div id='banner'>
            <p1>[BANNER]</p1>
            <br/>
        </div>
        <main>
            <div id='planning'>
                <div id='engagements'>
                    <p1>Current Engagements</p1>
                        {eventList.map((e) => (
                            <div key={e.name} className='event'>
                                <p>{'> ' + e.name + ', ' + e.volunteerPreference}</p>
                            </div>
                        ))}
                    <br/>
                    <button>Edit</button>
                </div>
                <div id='calendar'>
                    <button>Calendar</button>
                </div>
            </div>
            <div id='news'>
                <p1>Organization News / Highlighted Event</p1>
                <br/>
                <div id='showcase'>
                    {/* <img src='https://media-exp1.licdn.com/dms/image/C4E0BAQHikN6EXPd23Q/company-logo_200_200/0/1595359131127?e=2159024400&v=beta&t=S5MNjBDjiH433VCWzjPeiopNDhxGwmfcMk4Zf1P_m_s'></img> */}
                </div>
            </div>
        </main>

    </div>
    );
}

export default Welcome;
