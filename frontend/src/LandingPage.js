import React from 'react';
import Logo from './images/oce-logo-landing-page.png';
import Background from './images/landing-page-background.jpg';
import {Button, Modal} from 'react-bootstrap';
import './css/LandingPage.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SetAuthToken from "./actions/SetAuthToken";
import SignUp from "./SignUp.js";
import Header from './Header';
import LandingPageModal from './LandingPageModal'


class LandingPage extends React.Component {

   constructor(props) {
      super(props)
   }

   onClickLogin() {
      window.location.assign(`${process.env.REACT_APP_SERVER_URL}/api/auth/google`)
   }

   handleTryAgain = () => {
      this.onClickLogin()
   }

   handleClose = () => {
      window.location.assign('/')
   }

   handleSignUp = () => {
      window.location.assign('/signup')
   }

   render() {
      return (
         <BrowserRouter>
            <Switch>
               <Route exact path='/'>
                  <div style={{backgroundImage: `url(${Background})`}} id='landing-page'>
                     <div id='landing-page-banner'>
                        <div id='logo'>
                           <img src={Logo} alt='One Cool Earth Education and Preservation: Service Since 2001'/>
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
                  <Header signingUp={true} user={false}/>
                  <SignUp />
               </Route>
               <Route exact path="/fail">
                  <LandingPageModal
                      showModal={true}
                      handleClose={this.handleClose}
                      handleSignUp={this.handleSignUp}
                      handleTryAgain={this.handleTryAgain}
                  />
               </Route>
               <Route exact path="/auth/login/:token" component={SetAuthToken} />
            </Switch>
         </BrowserRouter>
      );
   }
}

export default LandingPage
