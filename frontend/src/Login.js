import React from 'react';
import {Button} from 'react-bootstrap';
import './css/Login.css';

class Login extends React.Component {
  render() {
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
        <div className = 'box3'>
          <div id = 'email-div'>
            <label for='email'>EMAIL</label>
            <input id = 'email'></input>
          </div>
          <div id = 'password-div'>
            <label for = 'password'>PASSWORD</label>
            <input id = 'password' type = 'password'></input>
          </div>
          <button id = 'log-in-button' onClick={() => {this.postLoginData(); this.clearFields()}}> Log In</button>
        </div>
        <Button>Submit</Button>
      </div>
    </div>
    );
  }
}
export default Login;
