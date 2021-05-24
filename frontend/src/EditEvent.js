import "react-dropdown/style.css";
import React from "react";
import "./css/CreateEvent.css";
import { Button } from "react-bootstrap";
import Select from "react-select";

// DUMMY: need to replace with backend data
const volunteerOptions = [
  { value: "garden workday", label: "Garden Workday Volunteer" },
  { value: "special events", label: "Special Events Volunteer" },
  { value: "garden educator", label: "Garden Educator Assistant" },
  { value: "office/remote", label: "Office/Remote Volunteer" },
  { value: "unsure", label: "Unsure or Interested in Multiple Opportunities" },
];
const locationOptions = [
  { value: "south county", label: "South County" },
  { value: "coastal", label: "Coastal" },
  { value: "san luis", label: "San Luis Obispo" },
  { value: "north county", label: "North County" },
];

// dummy data: change to data stored from backend
const stored_event_name = "Garden Day";
const stored_date = "01-02-03";
const stored_volunteer_preference = [
  { value: "garden workday", label: "Garden Workday Volunteer" },
  { value: "special events", label: "Special Events Volunteer" },
  { value: "unsure", label: "Unsure or Interested in Multiple Opportunities" },
];
const stored_location = [
  { value: "south county", label: "South County" },
  { value: "north county", label: "North County" },
];

class EditEvent extends React.Component {
  state = {
    volSelected: stored_volunteer_preference,
    locSelected: stored_location,
  };

  handleVolChange = (volSelected) => {
    this.setState({ volSelected }, () =>
      console.log(`Option selected:`, this.state.volSelected)
    );
  };

  handleLocChange = (locSelected) => {
    this.setState({ locSelected }, () =>
      console.log(`Option selected:`, this.state.locSelected)
    );
  };

  render() {
    const { volSelected } = this.state;
    const { locSelected } = this.state;

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
            <Select
              value={volSelected}
              onChange={this.handleVolChange}
              options={volunteerOptions}
              isMulti={true}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                borderColor: "black",
                colors: {
                  ...theme.colors,
                  neutral20: "black", // this is border line color
                },
                spacing: {
                  baseUnit: 8,
                },
              })}
            />
          </div>
          <div id="location-preference-field" className="drop-down">
            <label for="location-preference">Location Preference</label>
            <Select
              value={locSelected}
              onChange={this.handleLocChange}
              options={locationOptions}
              isMulti={true}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                borderColor: "black",
                colors: {
                  ...theme.colors,
                  neutral20: "black", // this is border line color
                },
                spacing: {
                  baseUnit: 8,
                },
              })}
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
