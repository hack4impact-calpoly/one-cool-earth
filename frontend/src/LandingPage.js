import React from 'react'
import logo from './images/oce-logo.png'
import './css/LandingPage.css';

class LandingPage extends React.Component {

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
                  <button>Log In</button>
               </div>
               <div id='signup-box'>
                  <button>Sign Up</button>
               </div>
            </div>
         </div>
      );
   }
}

export default LandingPage;