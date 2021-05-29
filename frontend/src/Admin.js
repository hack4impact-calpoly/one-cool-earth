import React from "react";
import {Button} from 'react-bootstrap';
import './css/Admin.css';

class Admin extends React.Component {
  render() {
    return (
        <div className="main">
			<div className="adminBox">
				<Button href="/create-event">Create Event</Button>
			</div>
			<div className="adminBox">
				<Button href="/spreadsheets">View Volunteer Data</Button>
			</div>
			<div className="adminBox">
				<Button>Edit Announcements</Button>
			</div>
			<div className="adminBox">
				<Button href="/edit-user">Edit Profile</Button>
			</div>
		</div>
    );
  }
}

export default Admin;
