import React from 'react'
import Welcome from './Welcome'
import Header from "./Header";
import CalendarPage from "./Calendar";
import Profile from "./Profile.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";


class Volunteer extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         user: this.props.user
      }
   }

   render() {
      return (
         <BrowserRouter>
         <Header user={this.state.user} />
            <Switch>
               <Route exact path="/">
                  <Welcome user ={this.state.user}/>
               </Route>
					<Route exact path="/calendar">
						<CalendarPage user={this.state.user}/>
					</Route>
					<Route exact path="/profile">
						<Profile user={this.state.user} />
					</Route>
            </Switch>
         </BrowserRouter>
      )
   }
}

export default Volunteer