import React from "react";
import {Button, Col, Row} from 'react-bootstrap';
import './css/Admin.css';

class Admin extends React.Component {
  render() {
    return (
      <div>
        <body>
	  <div id="main">
	    <div id="createEventBox">
	      <Button href="/create-event">CREATE EVENT</Button>
	    </div>
	    <div id="viewVolunteerDataBox">
	      <Button href="/spreadsheets">VIEW VOLUNTEER DATA</Button>
	    </div>
	    <div id="editAnnouncementsBox">
	      <Button>EDIT ANNOUNCEMENTS</Button>
	    </div>
	  </div>
	</body>
      </div>
    );
  }
}

export default Admin;
