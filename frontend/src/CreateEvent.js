import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React from 'react';
import './css/CreateEvent.css';
import { Button } from "react-bootstrap";

const volunteerOptions = [
  'Garden Workday Volunteer', 'Special Events Volunteer', 'Garden Educator Assistant', 
  'Office/Remote Volunteer', 'Unsure or Interested in Multiple Opportunities' 
]
const locationOptions = [
  'South County', 'Coastal', 'San Luis Obispo', 'North County'
]

class Event extends React.Component {
  render() {
    return(
      <body id = 'events-body'>
        <div className = 'box2'>
          <div id = 'events'>
            <label for = 'event-name'>Event Name</label>
            <input id='event-name'></input>
          </div>
          <div id = 'dates'>
          <label for = 'date'>Date</label>
          <input id = 'date'></input>
          </div>
        </div>
        <div className = 'box3'>
          <div id ='volunteer-preferences-field' className='drop-down'>
            <label for='volunteer-preferences'>Volunteer Preferences</label>
            <Dropdown id = 'volunteer-preferences' options={volunteerOptions} placeholder='Select'/>
          </div> 
          <div id='location-preference-field' className='drop-down'>
              <label for='location-preference'>Location Preference</label>
              <Dropdown id = 'location-preference' options={locationOptions} placeholder='Select'/>
          </div>
        </div>
        <div className = 'box4'>
          <Button>Create</Button>
        </div>
      </body>
    )
  };
}

export default Event;
