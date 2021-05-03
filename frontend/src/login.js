import React from 'react';
import './css/login.css';



class Login extends React.Component{
    postLoginData(){
      const inputEmail = document.getElementById('email').value;
      const inputPassword = document.getElementById('password').value;
      
      //Don't submit data unless both fields are non-empty
      if(inputEmail === "" || inputPassword === ""){
        return;
      }
    
      const loginData={
        email: inputEmail,
        password: inputPassword
      }
      
      console.log(loginData);
      
      fetch('http://localhost:3000/api/login', { //temporary URL
        method: 'POST',
        body: loginData
      });
    }

    clearFields(){
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    }

    render(){
      return (
      <body>
        {/* <div className = 'box1'>
          <button>Return home</button>
        </div> */}
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
          <button id = 'log-in-button' onClick={() => {this.postLoginData(); this.clearFields()}}> Log In</button>
        </div>
      </body>
    );
  }
}
export default Login;
