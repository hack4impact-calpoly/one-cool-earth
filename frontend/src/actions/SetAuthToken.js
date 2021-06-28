import { useParams } from 'react-router-dom'

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

   return <p>Loading...</p>;
 };

export default SetAuthToken
