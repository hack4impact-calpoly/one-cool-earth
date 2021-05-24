import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import './css/Header.css';

class Header extends React.Component {
  //return link components that should be accessible to current user
  getLinks(loggedIn, admin) {
    if(loggedIn && admin) {
      return (<Nav className="justify-content-end" style={{ width: "100%", paddingRight: "15px"}}>
        <Nav.Link className="custom-nav-link" href="/">Home</Nav.Link>
	<Nav.Link className="custom-nav-link" href="/admin">Admin</Nav.Link>
	<Nav.Link className="custom-nav-link" href="/spreadsheets">Spreadsheets</Nav.Link>
	<Nav.Link className="custom-nav-link" href="/calendar">Calendar</Nav.Link>
	<Nav.Link className="custom-nav-link" href={process.env.REACT_APP_SERVER_URL + "/api/logout"}>Logout</Nav.Link>
	</Nav>)		
    } else if (loggedIn) {
      return (<Nav className="justify-content-end" style={{ width: "100%", paddingRight: "15px"}}>
	<Nav.Link className="custom-nav-link" href="/">Home</Nav.Link>
	<Nav.Link className="custom-nav-link" href="/spreadsheets">Spreadsheets</Nav.Link>
	<Nav.Link className="custom-nav-link" href="/calendar">Calendar</Nav.Link>
	<Nav.Link className="custom-nav-link" href="/logout">Logout</Nav.Link>
	</Nav>)	
    } else {
      return (<Nav className="justify-content-end" style={{ width: "100%", paddingRight: "15px"}}>
	<Nav.Link className="custom-nav-link" href="/">Home</Nav.Link>
	<Nav.Link className="custom-nav-link" href="/logout">Sign Up</Nav.Link>
	<Nav.Link className="custom-nav-link" href="/logout">Login</Nav.Link>
	</Nav>)	
    }
  }

  render() {
    return(
      <Navbar style={{backgroundColor: "#fff", marginBottom: "10px"}}>
	{this.getLinks(true, true)}
      </Navbar>
    );
  }
}

export default Header;
