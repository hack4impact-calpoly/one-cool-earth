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
							<Button href={process.env.REACT_APP_SERVER_URL + "/create-event"}>CREATE EVENT</Button>
						</div>
						<div id="viewVolunteerDataBox">
							<Button>VIEW VOLUNTEER DATA</Button>
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
