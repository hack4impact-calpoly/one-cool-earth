import React from "react";
import Header from "./Header";
import Admin from "./Admin.js";
import Signup from "./SignUp.js";
import EditUser from "./EditUser.js";
import Welcome from "./Welcome.js";
import Spreadsheets from "./Spreadsheets.js";
import CalendarPage from "./Calendar";
import LandingPage from "./LandingPage";
import CreateEvent from "./CreateEvent";
import EditEvent from "./EditEvent";
import SetAuthToken from "./actions/SetAuthToken";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [user, setUser] = useState();
  const [StartPage, setStartPage] = useState();

  useEffect(() => {
    const URL = `${process.env.REACT_APP_SERVER_URL}/api/auth`;
    fetch(URL, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => console.error(err)); // catches when users aren't logged in
  }, []);

  useEffect(() => {
    setStartPage(
      user ? (
        user.admin ? (
	      <>
          <Header user = {user} />
          <Admin/>
	      </>
        ) : (
        <>
          <Header user = {user} />
          <Welcome user={user} />
        </>
        )
      ) : (
        <LandingPage />
      )
    );
  }, [user]);

  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              {StartPage}
            </Route>
            <Route path="/spreadsheets">
              <Header user = {user} />
              <Spreadsheets />
            </Route>
            <Route path="/signup">
              <Header user = {user} />
              <Signup />
            </Route>
            <Route path="/edit-user">
              <Header user = {user} />
              <EditUser />
            </Route>
            <Route path="/admin">
              <Header user = {user} />
              <Admin />
            </Route>
            <Route path="/calendar">
              <Header user = {user} />
              <CalendarPage />
            </Route>
            <Route path="/create-event">
              <Header user = {user} />
              <CreateEvent />
            </Route>
            <Route path="/edit-event">
              <Header user = {user} />
              <EditEvent />
            </Route>
            <Route path="/auth/login/:token" component={SetAuthToken} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
