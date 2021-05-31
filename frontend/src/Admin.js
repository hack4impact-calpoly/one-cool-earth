import React from "react";
import {Button} from 'react-bootstrap';
import './css/Admin.css';
import Header from "./Header";
import EditUser from "./EditUser.js";
import Spreadsheets from "./Spreadsheets.js";
import CalendarPage from "./Calendar";
import CreateEvent from "./CreateEvent";
import { BrowserRouter, Route, Switch } from "react-router-dom";


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
					</Route>
					<Route exact path="/spreadsheets">
						<Spreadsheets user={this.state.user}/>
					</Route>
					<Route exact path="/edit-user">
						<EditUser user={this.state.user} />
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
