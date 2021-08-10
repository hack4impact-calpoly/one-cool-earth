import React from 'react';
import Logo from './images/oce-logo-landing-page.png';
import Background from './images/landing-page-background.jpg';
import {Button, Modal} from 'react-bootstrap';
import './css/LandingPage.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SetAuthToken from "./actions/SetAuthToken";
import SignUp from "./SignUp.js";
import Header from './Header';
import LandingPageModal from './LandingPageModal'
import Jotform from './Jotform';

class LandingPage extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         signedUp: false,
         email: null
      }
   }

   handleSignUp = (email) => {
      this.setState({signedUp: true, email: email})
   }

   onClickLogin = () => {
      window.location.assign(`${process.env.REACT_APP_SERVER_URL}/api/auth/google`)
   }

   handleTryAgain = () => {
      this.onClickLogin()
   }

   handleClose = () => {
      window.location.assign('/')
   }

   handleSignUpClick = () => {
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
                  {
                     this.state.signedUp
                     ? <Redirect to='/jotform' />
                     :
                     <>
                        <Header signingUp={true} user={false}/>
                        <SignUp handleSignUp={this.handleSignUp} />
                     </>
                  }
               </Route>
               <Route exact path="/login/fail">
                  <LandingPageModal
                      showModal={true}
                      handleClose={this.handleClose}
                      handleSignUp={this.handleSignUpClick}
                      handleTryAgain={this.handleTryAgain}
                  />
               </Route>
               <Route exact path="/auth/login/:token" component={SetAuthToken} />
               <Route exact path="/jotform">
                  <Jotform handleLogin={this.onClickLogin} email={this.state.email} />
               </Route>
            </Switch>
         </BrowserRouter>
      );
   }
}

export default LandingPage
