import React from "react";
import Dropdown from "react-dropdown";
import { Button } from "react-bootstrap";
import "react-dropdown/style.css";
import "./css/SignUp.css";
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

var preference;
var loc;

// dummy data : replace with stored backend data
var stored_first = "dummy-first";
var stored_last = "dummy-last";
var stored_preferences = [
  { value: "garden workday", label: "Garden Workday Volunteer" },
  { value: "special events", label: "Special Events Volunteer" },
  { value: "unsure", label: "Unsure or Interested in Multiple Opportunities" },
];
var stored_phone = "dummy-phone";
var stored_email = "dummy-email";
var stored_location = [
  { value: "south county", label: "South County" },
  { value: "north county", label: "North County" },
];

class EditUser extends React.Component {
  state = {
    volSelected: stored_preferences,
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
  /*   constructor(props) {
    super(props);
    this.state = {
      selected: "",
    };
  }
 */
  /*   _onPreferenceSelect(option) {
    preference = option.label;
  }

  _onLocationSelect(option) {
    loc = option.label;
  }
 */
  postSignUpData() {
    const first = document.getElementById("first-name").value;
    const last = document.getElementById("last-name").value;
    const preferences = this.state.volSelected;
    const phone = document.getElementById("phone-number").value;
    const email = document.getElementById("email").value;
    const location = this.state.locSelected;

    //Don't submit data unless both fields are non-empty
    if (
      first === "" ||
      last === "" ||
      preferences === "" ||
      phone === "" ||
      email === "" ||
      location === ""
    ) {
      return;
    }

    const SignUpData = {
      firstName: first,
      lastName: last,
      preferences: this.state.volSelected,
      phoneNum: phone,
      email: email,
      loc: this.state.locSelected,
    };

    console.log(SignUpData);
  }

  clear() {
    // does'nt clear volPreference and locPreference
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    // preference = "";
    document.getElementById("phone-number").value = "";
    document.getElementById("email").value = "";
    // loc = "";
  }

  render() {
    const { volSelected } = this.state;
    const { locSelected } = this.state;
    return (
      <div className="wrapper">
        <div className="title">
          <h2>Edit Info</h2>
        </div>
        <div className="fields" style={{ paddingBottom: "20px" }}>
          <div className="fields-column">
            <div id="first-name-field" className="input">
              <label for="first-name">First Name</label>
              <input id="first-name" defaultValue={stored_first}></input>
            </div>
            <div id="last-name-field" className="input">
              <label for="last-name">Last Name</label>
              <input id="last-name" defaultValue={stored_last}></input>
            </div>
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
                /*               <Dropdown
                id="volunteer-preferences"
                onChange={this._onPreferenceSelect}
                options={volunteerOptions}
                placeholder={stored_preferences} */
              />
            </div>
          </div>
          <div className="fields-column">
            <div id="phone-number-field" className="input">
              <label for="phone-number">Phone Number</label>
              <input id="phone-number" defaultValue={stored_phone}></input>
            </div>
            <div id="email-field" className="input">
              <label for="email">Email</label>
              <input id="email" defaultValue={stored_email}></input>
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
              {/*               <Dropdown
                id="location-preference"
                onChange={this._onLocationSelect}
                options={locationOptions}
                placeholder={stored_location}
              /> */}
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            this.postSignUpData();
            this.clear();
          }}
        >
          {" "}
          Edit
        </Button>
      </div>
    );
  }
}

export default EditUser;
