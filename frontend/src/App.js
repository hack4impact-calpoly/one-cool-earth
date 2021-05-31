import React from "react";
import Admin from "./Admin.js";
import Volunteer from './Volunteer';
import LandingPage from "./LandingPage";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [StartPage, setStartPage] = useState(<LandingPage />);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_SERVER_URL}/api/auth`;
    fetch(URL, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => console.error(err)); // catches when users aren't logged in
  }, []);

  useEffect(() => {
    console.log(user);
    setStartPage(
      user ? (
        user.admin ? (
          <Admin user={user}/>
        ) : (
          <Volunteer user={user} />
        )
      ) : (
        <LandingPage user={user} />
      )
    );
  }, [user]);

  return (
    <div>
      {StartPage}
    </div>
  );
}

export default App;
