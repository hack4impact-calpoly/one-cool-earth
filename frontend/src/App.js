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
    <BrowserRouter>
   <div className="App">
      <Switch>
         <Route exact path="/">
            <LandingPage />
         </Route>
         <Route path="/login">
            <Header />
            <Login />
         </Route>
         <Route path="/spreadsheets">
            <Header />
            <Spreadsheets />
         </Route>
         <Route path="/signup">
            <Header />
            <Signup />
         </Route>
         <Route path="/admin">
            <Header />
            <Admin />
         </Route>
         <Route path="/calendar">
            <Header />
            <CalendarPage />
         </Route>
         <Route path="/login">
            <Header />
            <Login />
         </Route>
         <Route path="/spreadsheets">
            <Header />
            <Spreadsheets />
         </Route>
         <Route path="/signup">
            <Header />
            <Signup />
         </Route>
         <Route path="/admin">
            <Header />
	        <Admin />
         </Route>
         <Route path="/welcome">
            <Header />
            <Welcome />
         </Route>
      </Switch>
   </div>
   </BrowserRouter>
   </div>
  );
}

export default App;
