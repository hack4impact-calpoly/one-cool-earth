import React from "react";
import { Button } from "react-bootstrap";
import "react-dropdown/style.css";
import "./css/SignUp.css";
import Select from "react-select";
import JotformEmbed from 'react-jotform-embed';
import Iframe from 'react-iframe'

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

class Signup extends React.Component {
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
      name: {
          first: first,
          last: last
      },
      preferences: preferences,
      phoneNum: phone,
      email: email,
      loc: location,
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/signup`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(SignUpData),
    }).then (() => {
        window.location.assign('/login')
    })
  }

  clear() {
    // everything except for the 2 dropdown menu values gets reset
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    //this.state.volSelected = [];
    document.getElementById("phone-number").value = "";
    document.getElementById("email").value = "";
    //this.state.locSelected = [];
  }

  render() {
    const { volSelected } = this.state;
    const { locSelected } = this.state;

    return (
      <div className="wrapper">
        <div className="title">
          <h2>New Volunteer? Sign Up Here!</h2>
        </div>
        <div className="fields-jotform-wrapper">
          <div className="fields" style={{ paddingBottom: "20px" }}>
            <div className="fields-column">
              <div id="first-name-field" className="input">
                <label for="first-name">First Name</label>
                <input id="first-name"></input>
              </div>
              <div id="last-name-field" className="input">
                <label for="last-name">Last Name</label>
                <input id="last-name"></input>
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
                />
              </div>
            </div>
            <div className="fields-column">
              <div id="phone-number-field" className="input">
                <label for="phone-number">Phone Number</label>
                <input id="phone-number"></input>
              </div>
              <div id="email-field" className="input">
                <label for="email">Email</label>
                <input id="email"></input>
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
          </div>
          <div className="jotform">
            <JotformEmbed src="https://form.jotform.com/70895957565174" scrolling="on"/>
          </div>
          <div className="iframe-jotform">
            <Iframe url="https://form.jotform.com/70895957565174"
              width="450px"
              height="450px"
              className="jotform"
              display="initial"
              position="relative"
            />
          </div>
        </div>
        <Button
          onClick={() => {
            this.postSignUpData();
            this.clear();
          }}
        >
          {" "}
          Sign Up
        </Button>
      </div>
    );
  }
}

export default Signup;
