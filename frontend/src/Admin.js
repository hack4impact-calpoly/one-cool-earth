import React from "react";
import { Button } from "react-bootstrap";
import "./css/Admin.css";
import Header from "./Header";
import Profile from "./Profile.js";
import Spreadsheets from "./Spreadsheets.js";
import CalendarPage from "./Calendar";
import CreateEvent from "./CreateEvent";
import Announcements from "./Announcements";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

class Admin extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header signingUp={false} user={this.props.user} />
        <Switch>
          <Route exact path="/">
            <Container className="admin-homepage">
              <div className="admin-card-row">
                <Card style={{ borderRadius: "0%" }} className="admin-card">
                  <Card.Header as="h4">Event Creation</Card.Header>
                  <Card.Body className="admin-card-body">
                    <Card.Title>Create An Event Here</Card.Title>
                    <Card.Text style={{ fontSize: "16px" }}>
                      Would you like to create a volunteer event?
                    </Card.Text>
                    <Button href="/create-event">Click Here</Button>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
                <Card style={{ borderRadius: "0%" }} className="admin-card">
                  <Card.Header as="h4">Volunteer & Event Data</Card.Header>
                  <Card.Body className="admin-card-body">
                    <Card.Title>View/Edit Volunteers/Events here</Card.Title>
                    <Card.Text style={{ fontSize: "16px" }}>
                      Would you like to view and/or edit volunteer and event
                      information?
                    </Card.Text>
                    <Button href="/spreadsheets">Click Here</Button>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
              </div>
              <div className="admin-card-row">
                <Card style={{ borderRadius: "0%" }} className="admin-card">
                  <Card.Header as="h4">Profile</Card.Header>
                  <Card.Body className="admin-card-body">
                    <Card.Title>View Your Profile</Card.Title>
                    <Card.Text style={{ fontSize: "16px" }}>
                      Would you like to view and/or edit your profile?
                    </Card.Text>
                    <Button href="/profile">Click Here</Button>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
                <Card style={{ borderRadius: "0%" }} className="admin-card">
                  <Card.Header as="h4">Announcements</Card.Header>
                  <Card.Body className="admin-card-body">
                    <Card.Title>Edit Your Announcements</Card.Title>
                    <Card.Text style={{ fontSize: "16px" }}>
                      Would you like to view and/or edit your announcements?
                    </Card.Text>
                    <Button href="/announcements">Click Here</Button>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
              </div>
            </Container>
          </Route>
          <Route exact path="/spreadsheets">
            <Spreadsheets user={this.props.user} />
          </Route>
          <Route exact path="/profile">
            <Profile user={this.props.user} admin={true} />
          </Route>
          <Route exact path="/calendar">
            <CalendarPage user={this.props.user} />
          </Route>
          <Route exact path="/create-event">
            <CreateEvent user={this.props.user} />
          </Route>
          <Route exact path="/announcements">
            <Announcements user={this.props.user} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Admin;
