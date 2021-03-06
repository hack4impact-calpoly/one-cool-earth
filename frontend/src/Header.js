import React from 'react';
import {Navbar, NavbarBrand, Nav} from 'react-bootstrap';
import './css/Header.css';
import Logo from './images/oce-logo.png';

class Header extends React.Component {

  //return link components that should be accessible to current user
  getLinks(signingUp, loggedIn, admin) {
    if(loggedIn && admin) {
        return (
            <Nav className="justify-content-end" style={{ width: "100%", paddingRight: "15px"}}>
              <Nav.Link className="custom-nav-link" href="/">Home</Nav.Link>
              <Nav.Link className="custom-nav-link" href={process.env.REACT_APP_SERVER_URL + "/api/logout"}>Logout</Nav.Link>
            </Nav>
        )
    } else if (loggedIn && !admin) {
        return (
            <Nav className="justify-content-end" style={{ width: "100%", paddingRight: "15px"}}>
              <Nav.Link className="custom-nav-link" href="/">Home</Nav.Link>
              <Nav.Link className="custom-nav-link" href="/profile">Profile</Nav.Link>
              <Nav.Link className="custom-nav-link" href={process.env.REACT_APP_SERVER_URL + "/api/logout"}>Logout</Nav.Link>
            </Nav>
        )
    } else if (signingUp && !loggedIn && !admin) {
        return (
            <Nav className="justify-content-end" style={{ width: "100%", paddingRight: "15px"}}>
                <Nav.Link className="custom-nav-link" href="/">Home</Nav.Link>
            </Nav>
        )
    }
  }

  render() {
    return(
        (this.props.user || this.props.signingUp)
        ?
            <Navbar className="custom-header">
                <NavbarBrand href='https://www.onecoolearth.org'>
                    <div className="logo-wrapper"> <img src={Logo} alt="one cool earth's logo"/></div>
            </NavbarBrand>
                {this.getLinks(true, this.props.user, this.props.user.admin)}
            </Navbar>
        : null
    );
  }
}

export default Header;
