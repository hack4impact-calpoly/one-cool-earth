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
    const URL = `${process.env.REACT_APP_SERVER_URL}/api/user`;
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
	    {" "}
	    <Header/>
            <Admin/>
            {" "}
	  </>
	) : (
          <>
            {" "}
            <Header/>
	    <Welcome/>
	    {" "}
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
              <Header />
              <Spreadsheets />
            </Route>
            <Route path="/signup">
              <Header />
              <Signup />
            </Route>
            <Route path="/edit-user">
              <Header />
              <EditUser />
            </Route>
            <Route path="/admin">
              <Header />
              <Admin />
            </Route>
            <Route path="/calendar">
              <Header />
              <CalendarPage />
            </Route>
            <Route path="/create-event">
              <Header />
              <CreateEvent />
            </Route>
            <Route path="/edit-event">
              <Header />
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
