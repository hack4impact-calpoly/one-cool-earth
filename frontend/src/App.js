import './css/App.css';
import Header from './Header';
import Admin from './admin.js';
import LandingPage from './LandingPage';
import Signup from './signup.js';
import Login from './login.js';
import Spreadsheets from './spreadsheets.js';
import CalendarPage from './calendar'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div>
    <Header></Header>
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
            <Signup />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/calendar">
            <CalendarPage />
          </Route>
<<<<<<< HEAD
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
=======
>>>>>>> dbc384915d6085ee5de3a2ca356074b29b20c2f3
        </Switch>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
