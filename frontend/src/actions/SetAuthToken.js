import { useParams } from 'react-router-dom'

const SetAuthToken = () => {
   const { token } = useParams(); // import from react-router-dom
 
   fetch(`http://localhost:3001/api/auth/token`, {
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