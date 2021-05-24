import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import './css/Welcome.css';

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventList: []
        }
    }

    componentDidMount() {

        // Example of API data
        // const json = [
        //     {
        //         "name" : "Sample Cleanup Event",
        //         "date": new Date(),
        //         "location" : "San Luis Obispo",
        //         "volunteerPreference" : "Office/Remote Volunteer"
        //     },
        //     {
        //         "name" : "Sample Gardening Event",
        //         "date": new Date(),
        //         "location" : "North County",
        //         "volunteerPreference" : "Garden Educator Assistant"
        //     },
        //     {
        //         "name" : "Sample Secial Event",
        //         "date": new Date(),
        //         "location" : "Coastal",
        //         "volunteerPreference" : "Special Events Volunteer"
        //     }
        // ];

        const URL = `${process.env.REACT_APP_SERVER_URL}/api/get-all`; // may need to change URL suffix
        fetch(URL)
          .then((res) => res.json())
          .then((json) => this.setState({eventList: json}))
          .catch((err) => console.error(err));
    }

    render() {
        return (
            <div id='welcome'>
                <h1>Welcome, {this.props.user.name.first}</h1>
                    <div id='banner'>
                        <p1>[BANNER]</p1>
                        <br/>
                    </div>
                <main>
                    <div id='planning'>
                        <div id='engagements'>
                            <p1>Current Engagements</p1>
                                {this.state.eventList.map((e) => (
                                    <div key={e.name} className='event'>
                                        <p>{'> ' + e.name + ', ' + e.volunteerPreference}</p>
                                    </div>
                                ))}
                            <br/>
                            <Button>Edit</Button>
                        </div>
                        <div id='calendar'>
                            <Button>Calendar</Button>
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
}

export default Welcome;
