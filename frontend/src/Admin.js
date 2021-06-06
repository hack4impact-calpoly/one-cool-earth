import React from "react";
import {Button} from 'react-bootstrap';
import './css/Admin.css';
import Header from "./Header";
import Profile from "./Profile.js";
import Spreadsheets from "./Spreadsheets.js";
import CalendarPage from "./Calendar";
import CreateEvent from "./CreateEvent";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Card } from 'react-bootstrap'


class Admin extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			user: this.props.user
		}
	}

  render() {
    return (
		 <div>
			<BrowserRouter>
			<Header user={this.state.user} />
				<Switch>
					<Route exact path="/">	
						<div className="admin-homepage">
							<div className="adminBox">
							<Card style={{ width: '18rem' }}>
								<Card.Header as="h5"> Create an event here</Card.Header>
								<Card.Body>
								<Button href="/create-event">Create Event</Button>
								</Card.Body>
							</Card>
							</div>
							<div className="adminBox">
								<Button href="/spreadsheets">View Volunteer Data</Button>
							</div>
							<div className="adminBox">
								<Button>Edit Announcements</Button>
							</div>
							<div className="adminBox">
								<Button href="/profile">Edit Profile</Button>
							</div>
						</div>
					</Route>
					<Route exact path="/spreadsheets">
						<Spreadsheets user={this.state.user} />
					</Route>
					<Route exact path="/profile">
						<Profile user={this.state.user} />
					</Route>
					<Route exact path="/calendar">
						<CalendarPage user={this.state.user}/>
					</Route>
						<Route exact path="/create-event">
					<CreateEvent user={this.state.user}/>
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
    );
  }
}

export default Admin;
