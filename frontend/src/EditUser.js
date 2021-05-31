import React from "react";
import Dropdown from "react-dropdown";
import { Button } from "react-bootstrap";
import "react-dropdown/style.css";
import "./css/SignUp.css";
import Select from "react-select";

// // DUMMY: need to replace with backend data
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

// var preference;
// var loc;

// // dummy data : replace with stored backend data
// var stored_first = data.first;
// var stored_last = "dummy-last";
var stored_preferences = [
  { value: "garden workday", label: "Garden Workday Volunteer" },
  { value: "special events", label: "Special Events Volunteer" },
  { value: "unsure", label: "Unsure or Interested in Multiple Opportunities" },
];
// var stored_phone = "dummy-phone";
// var stored_email = "dummy-email";
var stored_location = [
  { value: "south county", label: "South County" },
  { value: "north county", label: "North County" },
];

class EditUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    stored_first: "",
    stored_last: "",
    stored_preferences: [],
    stored_phone: "",
    stored_email: "",
    stored_location: [],
    volSelected: [],
    locSelected: [],
    volunteerOptions: [],
    locationOptions: []
    };
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    let email = "patrickstar24@gmail.com"

    let response = await fetch(process.env.REACT_APP_SERVER_UL + '/api/user/get/' + email, {
      mode: 'cors',
      credentials: 'include',
    })

    const data = await response.json()
    const prefArray = []
    for (let pref of data.volunteerPreferences) {
        for (let option of volunteerOptions) {
          console.log("pref", pref, "option.value", option.value)
          if (pref === option.value)
            prefArray.push(option)
        }
    }
    const locationArray = []
    for (let option of locationOptions) {
      console.log("loc", data.location, "option.value", option.value)
      if (data.location == option.value)
        locationArray.push(option)
    }

    this.setState({
      stored_first: data.name.first,
      stored_last: data.name.last,
      stored_phone: data.phone,
      stored_email: data.email,
      stored_location: locationArray,
      stored_preferences: prefArray,
      volSelected: prefArray,
      locSelected: locationArray
    })
    console.log(this.state)
  }

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
 
  /*   _onPreferenceSelect(option) {
    preference = option.label;
  }

  _onLocationSelect(option) {
    loc = option.label;
  }
 */
  async postSignUpData() {
    const first = document.getElementById("first-name").value;
    const last = document.getElementById("last-name").value;
    const preferences = this.state.volSelected;
    const phone = document.getElementById("phone-number").value;
    const email = document.getElementById("email").value;
    const location = this.state.locSelected;

    //Don't submit data unless both fields are non-empty
    if (
      first === this.state.stored_first &&
      last === this.state.stored_last &&
      preferences === this.state.stored_preferences &&
      phone === this.state.stored_phone &&
      email === this.state.stored_email &&
      location === this.state.stored_location
    ) {
      return;
    }

    const volArray = []
    for (let pref of preferences) {
      volArray.push(pref.value)
    }

    const locArray = []
    for (let loc of location) {
      locArray.push(loc.value)
    }

    this.setState({
      stored_preferences: volArray,
      stored_location: locArray
    })
    const SignUpData = {
      name: {
        firstName: first,
        lastName: last
      },
      volunteerPreferences: volArray,
      phoneNum: phone,
      email: this.state.stored_email,
      location: locArray[0],
    };

    await fetch(process.env.REACT_APP_SERVER_URL + `/api/user/edit`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(SignUpData)
      });

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
    // const { volSelected } = this.state.stored_preferences;
    // const { locSelected } = this.state.stored_location;
    return (
      <div className="wrapper">
        <div className="title">
          <h2>Edit Info</h2>
        </div>
        <div className="fields" style={{ paddingBottom: "20px" }}>
          <div className="fields-column">
            <div id="first-name-field" className="input">
              <label for="first-name">First Name</label>
              <input id="first-name" defaultValue={this.state.stored_first}></input>
            </div>
            <div id="last-name-field" className="input">
              <label for="last-name">Last Name</label>
              <input id="last-name" defaultValue={this.state.stored_last}></input>
            </div>
            <div id="volunteer-preferences-field" className="drop-down">
              <label for="volunteer-preferences">Volunteer Preferences</label>
              <Select
                value={this.state.volSelected}
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
                placeholder={this.state.stored_preferences} */
              />
            </div>
          </div>
          <div className="fields-column">
            <div id="phone-number-field" className="input">
              <label for="phone-number">Phone Number</label>
              <input id="phone-number" defaultValue={this.state.stored_phone}></input>
            </div>
            <div id="email-field" className="input">
              <label for="email">Email</label>
              <input id="email" defaultValue={this.state.stored_email}></input>
            </div>
            <div id="location-preference-field" className="drop-down">
              <label for="location-preference">Location Preference</label>
              <Select
                value={this.state.locSelected}
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
            console.log("clicked edit");
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
