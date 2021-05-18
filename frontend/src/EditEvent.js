import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import React from "react";
import "./css/CreateEvent.css";
import { Button } from "react-bootstrap";

// options from backend
const volunteerOptions = [
  "Garden Workday Volunteer",
  "Special Events Volunteer",
  "Garden Educator Assistant",
  "Office/Remote Volunteer",
  "Unsure or Interested in Multiple Opportunities",
];

// options from backend
const locationOptions = [
  "South County",
  "Coastal",
  "San Luis Obispo",
  "North County",
];

// dummy data: change to data stored from backend
const stored_event_name = "Garden Day";
const stored_date = "01-02-03";
const stored_volunteer_preference = "Garden Workday Volunteer";
const stored_location = "Coastal";

class EditEvent extends React.Component {
  render() {
    return (
      <body id="events-body">
        <div className="box2">
          <div id="events">
            <label for="event-name">Event Name</label>
            <input id="event-name" defaultValue={stored_event_name}></input>
          </div>
          <div id="dates">
            <label for="date">Date</label>
            <input id="date" defaultValue={stored_date}></input>
          </div>
        </div>
        <div className="box3">
          <div id="volunteer-preferences-field" className="drop-down">
            <label for="volunteer-preferences">Volunteer Preferences</label>
            <Dropdown
              id="volunteer-preferences"
              options={volunteerOptions}
              placeholder={stored_volunteer_preference}
            />
          </div>
          <div id="location-preference-field" className="drop-down">
            <label for="location-preference">Location Preference</label>
            <Dropdown
              id="location-preference"
              options={locationOptions}
              placeholder={stored_location}
            />
          </div>
        </div>
        <div className="box4">
          <Button>Edit</Button>
        </div>
      </body>
    );
  }
}

export default EditEvent;
