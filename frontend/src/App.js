import './css/App.css';
import Admin from './admin.js';
import LandingPage from './LandingPage';
import Signup from './signup.js';
import Login from './login.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
	    <LandingPage />
          </Route>
	  <Route path="/login">
	    <Login />
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
  );
}


export default App;
