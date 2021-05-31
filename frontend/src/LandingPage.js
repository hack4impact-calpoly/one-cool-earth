import React from 'react';
import logo from './images/oce-logo.png';
import {Button} from 'react-bootstrap';
import './css/LandingPage.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SetAuthToken from "./actions/SetAuthToken";
import SignUp from "./SignUp.js";
import Header from './Header';

const landingPageStyles = {
	minHeight: '100vh',
	minWidth: '100vw',
	backgroundRepeat: 'no-repeat',
	backgroundAttachment: 'fixed',
	backgroundPosition: 'center',
	backgroundSize: 'cover',
	backgroundImage: `url(/landing-page-background.jpg)`,
	webkitBackgroundSize: 'cover',
  	mozBackgroundSize: 'cover',
  	oBackgroundSize: 'cover',
	fontFamily: 'sans-serif',
	paddingTop: '1%',
	paddingBottom: '4%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center'	
}

class LandingPage extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         user: this.props.user
      }
   }

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
         <BrowserRouter>
            <Switch>
               <Route exact path='/'>
                  <div style={landingPageStyles} id='landing-page'>
                     <div id='landing-page-banner'>
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
               </Route>
               <Route exact path='/signup'>
                  <Header signup={true} />
                  <SignUp />
               </Route>
               <Route exact path="/auth/login/:token" component={SetAuthToken} />
            </Switch>
         </BrowserRouter>
      );
   }
}

export default LandingPage;