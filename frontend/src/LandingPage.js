import React from 'react'
import './css/LandingPage.css';

class LandingPage extends React.Component {

   render() {
      return (
         <body>
            <div id="upperHalf">
               <div className="VolunteerOpportunities">
                  <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/pastel-mint-green-color-garaga-designs.jpg" alt="This is a temp img and message"/>
               </div>
               <div className="VolunteerOpportunities">
                  <h2>Volunteer</h2><h2>Opportunities</h2>
               </div>
            </div>

            <div id="buttons">
               <div className="loginBox">
                  <button>LOG IN</button>
               </div>
               <div className="signupBox">
                  <button>SIGN UP</button>
               </div>
            </div>
         </body>
      );
   }
}

export default LandingPage;