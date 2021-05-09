import './css/App.css';
import Header from './Header';
import Admin from './admin.js';
import LandingPage from './LandingPage';
import Signup from './signup.js';
import Login from './login.js';
//import Welcome from './welcome.js';
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
      </Switch>
   </div>
   </BrowserRouter>
   </div>
  );
}

export default App;
