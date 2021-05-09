import './css/App.css';
import Header from './Header';
import Admin from './Admin.js';
import LandingPage from './LandingPage';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Spreadsheets from './Spreadsheets.js';
import CalendarPage from './Calendar'
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
    </div>
  );
}

export default App;
