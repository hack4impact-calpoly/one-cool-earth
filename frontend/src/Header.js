import React from 'react';
import {Navbar, NavbarBrand, Nav} from 'react-bootstrap';
import './css/Header.css';
import Logo from './images/oce-logo.png';

class Header extends React.Component {
  
  //return link components that should be accessible to current user
  getLinks(loggedIn, admin) {
    if(loggedIn && admin) {
      return (
        <Nav className="justify-content-end" style={{ width: "100%", paddingRight: "15px"}}>
          <Nav.Link className="custom-nav-link" href={process.env.REACT_APP_SERVER_URL + "/api/logout"}>Logout</Nav.Link>
        </Nav>)		
    } else if (loggedIn && !admin) {
      return (
        <Nav className="justify-content-end" style={{ width: "100%", paddingRight: "15px"}}>
          <Nav.Link className="custom-nav-link" href="/profile">Profile</Nav.Link>
          <Nav.Link className="custom-nav-link" href={process.env.REACT_APP_SERVER_URL + "/api/logout"}>Logout</Nav.Link>
        </Nav>)	
    }
  }

  render() {
    return(
      (this.props.user || this.props.signup) 
      ?
        <div className="custom-header">
          <Navbar style={{backgroundColor: "#fff", marginBottom: "10px", paddingLeft: "20px"}}>
            <NavbarBrand className="custom-home-link" href='/'> 
              <div className="custom-home-link-wrapper"> 
                <div className="logo-wrapper"> <img src={Logo} /> </div> 
                <div>Home</div>
              </div>
            </NavbarBrand>
            {this.props.signup
            ? null 
            : this.getLinks(true, this.props.user.admin)}
          </Navbar> 
        </div>
      : null
    );
  }
}

export default Header;
