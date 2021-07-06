import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import React from "react";

const spinnerStyle = {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)'
}

const SetAuthToken = () => {
   const { token } = useParams();

   fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/token`, {
     method: 'POST',
     mode: 'cors',
     credentials: 'include',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({token}),
   })
   .then(() => window.location.assign('/'));

   return (
       <div style={spinnerStyle}>
           <Spinner animation="border" role="status" />
       </div>
   )
 };

export default SetAuthToken
