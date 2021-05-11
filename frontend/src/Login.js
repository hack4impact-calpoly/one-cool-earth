import './css/Login.css';
import {Button} from "react-bootstrap";

function Login() {
  return (
    <div>
      <div className = 'box2'>
        <p>Log In</p>
      </div>
      <div className = 'box3'>
        <div id = 'email-div'>
          <label for='email'>EMAIL</label>
          <input id = 'email'></input>
        </div>
        <div id = 'password-div'>
          <label for = 'password'>PASSWORD</label>
          <input id = 'password' type = 'password'></input>
        </div>
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default Login;
