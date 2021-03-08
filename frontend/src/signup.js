import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './css/signup.css';

function Signup() {
  const volunteerOptions = [
    'Garden Workday Volunteer', 'Special Events Volunteer', 'Garden Educator Assistant', 
    'Office/Remote Volunteer', 'Unsure or Interested in Multiple Opportunities' 
  ]
  const locationOptions = [
    'South County', 'Coastal', 'San Luis Obispo', 'North County'
  ]

  return (
    <div className = 'wrapper'>
        <div className='title'>
            <h2>New Volunteer? Sign Up Here!</h2>
        </div>
        <div className='fields'>
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
                    <Dropdown id = 'volunteer-preferences' options={volunteerOptions} placeholder='Select'/>
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
                    <Dropdown id = 'location-preference' options={locationOptions} placeholder='Select'/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Signup;
