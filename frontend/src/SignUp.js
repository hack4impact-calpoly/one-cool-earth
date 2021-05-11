import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './css/SignUp.css';
import {Button} from "react-bootstrap";

const volunteerOptions = [
    'Garden Workday Volunteer', 'Special Events Volunteer', 'Garden Educator Assistant', 'Office/Remote Volunteer', 'Unsure or Interested in Multiple Opportunities'
  ]
  const locationOptions = [
    'South County', 'Coastal', 'San Luis Obispo', 'North County'
  ]

  var preference;
  var loc;

class Signup extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
          selected: ''
        }
      }

      _onPreferenceSelect (option) {
          preference = option.label;
      }

      _onLocationSelect (option) {
        loc = option.label;
    }



    postSignUpData(){
        const first = document.getElementById("first-name").value;
        const last = document.getElementById("last-name").value;
        const preferences = preference;
        const phone = document.getElementById("phone-number").value;
        const email = document.getElementById("email").value;
        const location = loc;

      //Don't submit data unless both fields are non-empty
      if(first === "" || last === "" || preferences === "" || phone === "" || email === "" || location === ""){
        return;
      }

      const SignUpData={
        firstName: first,
        lastName: last,
        preferences: preferences,
        phoneNum : phone,
        email : email,
        loc : location
      }

      console.log(SignUpData);
    }

    clear() {
        document.getElementById("first-name").value = '';
        document.getElementById("last-name").value = '';
        preference = "";
        document.getElementById("phone-number").value = '' ;
        document.getElementById("email").value = '';
        loc = "";
    }


    render() {
        return (
            <div className = 'wrapper'>
                <div className='title'>
                    <h2>New Volunteer? Sign Up Here!</h2>
                </div>
                <div className='fields' style={{paddingBottom: "20px"}}>
                    <div className='fields-column'>
                        <div id='first-name-field' className='input'>
                            <label for='first-name'>First Name</label>
                            <input id='first-name'></input>
                        </div>
                        <div id='last-name-field' className='input'>
                            <label for='last-name'>Last Name</label>
                            <input id='last-name'></input>
                        </div>
                        <div id ='volunteer-preferences-field' className='drop-down'>
                            <label for='volunteer-preferences'>Volunteer Preferences</label>
                            <Dropdown id = 'volunteer-preferences' onChange={this._onPreferenceSelect} options={volunteerOptions} placeholder='Select'/>

                        </div>
                    </div>
                    <div className='fields-column'>
                        <div id='phone-number-field' className='input'>
                            <label for='phone-number'>Phone Number</label>
                            <input id='phone-number'></input>
                        </div>
                        <div id='email-field' className='input'>
                            <label for='email'>Email</label>
                            <input id='email'></input>
                        </div>
                        <div id='location-preference-field' className='drop-down'>
                            <label for='location-preference'>Location Preference</label>
                            <Dropdown id = 'location-preference' onChange={this._onLocationSelect} options={locationOptions} placeholder='Select'/>
                        </div>
                    </div>
                </div>
                <Button onClick={() => {this.postSignUpData(); this.clear()}}> Sign Up</Button>
            </div>
    );
  }
}

export default Signup;