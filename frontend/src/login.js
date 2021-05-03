import React from 'react';
import './css/login.css';

// function postLoginData(){
//   const inputEmail = document.getElementById("email").value;
//   const inputPassword = document.getElementById("password").value;

//   if(inputEmail == null || inputPassword == null){
//     return;
//   }

//   const loginData={
//     email: inputEmail,
//     password: inputPassword
//   }
  
//   console.log(loginData);
// }

class Login extends React.Component{
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
          <button id = 'log-in-button'> Log In</button>
        </div>
      </body>
    );
  }
}
export default Login;
