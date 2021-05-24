import React from 'react';
import logo from './images/oce-logo.png';
import {Button} from 'react-bootstrap';
import './css/LandingPage.css';

class LandingPage extends React.Component {

   onClickLogin() {
      // fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
      //    mode: 'cors', 
      //    credentials: "include" 
      // })
      // .then( () => {
         window.location.assign(`${process.env.REACT_APP_SERVER_URL}/api/auth/google`)
      // })
   }

   render() {
      return (
         <div id='landing-page'>
            <div id='banner'>
               <div id='logo'>
                  <img src={logo} alt='One Cool Earth Education and Preservation: Service Since 2001'/>
               </div>
               <div id='title'>
                  <h2 className='volunteer-opportunities'>Volunteer</h2>
                  <h2 className='volunteer-opportunities'>Opportunities</h2>
               </div>
            </div>
            <div id='options'>
               <div id='login-box'>
                  <Button onClick={this.onClickLogin}  variant="whiteLarge">Log In</Button>
               </div>
               <div id='signup-box'>
                  <Button href='/signup' variant="whiteLarge">Sign Up</Button>
               </div>
            </div>
         </div>
      );
   }
}

export default LandingPage;