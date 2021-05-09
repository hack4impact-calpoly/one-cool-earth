import './css/App.css';
import Header from './Header';
import Admin from './Admin.js';
import LandingPage from './LandingPage';
<<<<<<< HEAD
import SignUp from './SignUp.js';
import Login from './Login.js';
import Spreadsheets from './Spreadsheets.js';
import CalendarPage from './Calendar'
=======
import Signup from './signup.js';
import Login from './login.js';
import Welcome from './welcome.js';
import Spreadsheets from './spreadsheets.js';
import CalendarPage from './calendar'
>>>>>>> 270f071c64d640c7f60276d7e56da003c401d470
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div>
    <Header></Header>
<<<<<<< HEAD
    <BrowserRouter>

      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/spreadsheets">
            <Spreadsheets />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/calendar">
            <CalendarPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
=======
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
	            <LandingPage />
            </Route>
	          <Route path="/login">
	            <Login />
            </Route>
            {/* <Route path="/spreadsheets">
              <Spreadsheets />
            </Route> */}
	          <Route path="/signup">
	            <Signup />
	          </Route>
	          <Route path="/admin">
	            <Admin />
	          </Route>
            <Route path='/welcome'>
              <Welcome />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
>>>>>>> 270f071c64d640c7f60276d7e56da003c401d470
    </div>
  );
}

export default App;
