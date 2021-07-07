import React from "react";
import Admin from "./Admin.js";
import Volunteer from './Volunteer';
import LandingPage from "./LandingPage";
import { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner'

const spinnerStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
}

function App() {
  const [user, setUser] = useState(null)
  const [StartPage, setStartPage] = useState(<LandingPage />)
  const [isAuthenticating, setIsAuthenticating] = useState(true)


  useEffect(() => {
    const URL = `${process.env.REACT_APP_SERVER_URL}/api/auth`;
    fetch(URL, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user)
        setIsAuthenticating(false)
      })
      .catch((err) => {
        console.error(err)
        setIsAuthenticating(false)
      }) // catches error
  }, [])

  useEffect(() => {
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
  }, [user])

  return (
    <div>
      { isAuthenticating ? (
        <div style={spinnerStyle}>
          <Spinner animation="border" role="status" />
        </div>
      ) : StartPage }
    </div>
  );
}

export default App;
