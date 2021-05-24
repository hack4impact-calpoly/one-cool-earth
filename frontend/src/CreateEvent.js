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

class CreateEvent extends React.Component {
  state = {
    volSelected: null,
    locSelected: null,
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
            <input id="event-name"></input>
          </div>
          <div id="dates">
            <label for="date">Date</label>
            <input id="date"></input>
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
          <Button>Create</Button>
        </div>
      </body>
    );
  }
}

export default CreateEvent;
