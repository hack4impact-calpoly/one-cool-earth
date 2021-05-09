import './css/App.css';
import Header from './Header';
import Admin from './Admin.js';
import Signup from './SignUp.js';
import Login from './Login.js';
import Welcome from './Welcome.js';
import Spreadsheets from './Spreadsheets.js';
import CalendarPage from './Calendar'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './LandingPage';

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
         <Route path="/welcome">
            <Welcome />
         </Route>
      </Switch>
   </div>
   </BrowserRouter>
   </div>
  );
}

export default App;
