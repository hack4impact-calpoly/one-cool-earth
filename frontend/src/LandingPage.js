import React from 'react'
import './css/LandingPage.css';

class LandingPage extends React.Component {

   render() {
      return (
         <div id='landing-page'>
            <div id='welcome-banner'>
               <div id='logo'>
                  <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/pastel-mint-green-color-garaga-designs.jpg" alt="This is a temp img and message"/>
               </div>
               <div id='title'>
                  <h2 className='volunteer-opportunities'>Volunteer</h2>
                  <h2 className='volunteer-opportunities'>Opportunities</h2>
               </div>
            </div>

            <div id="buttons">
               <div className="loginBox">
                  <button>Log In</button>
               </div>
               <div className="signupBox">
                  <button>Sign Up</button>
               </div>
            </div>
         </div>
      );
   }
}

export default LandingPage;