import './css/events.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Event() {
  const volunteerOptions = [
    'Garden Workday Volunteer', 'Special Events Volunteer', 'Garden Educator Assistant', 
    'Office/Remote Volunteer', 'Unsure or Interested in Multiple Opportunities' 
  ]
  const locationOptions = [
    'South County', 'Coastal', 'San Luis Obispo', 'North County'
  ]
  return (
    <body>
      <div className = 'box1'>
        <button id = 'home-button'>Return home</button>
        <button id = 'logout-button'>Log Out</button>
      </div>
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
        <button id = 'create-button'>Create</button>
      </div>
    </body>
  );
}

export default Event;
