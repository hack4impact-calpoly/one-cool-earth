import './css/App.css';
import Header from './Header';
import Admin from './admin.js';
import LandingPage from './LandingPage';
import Signup from './signup.js';
import Login from './login.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Spreadsheets from './spreadsheets.js';

function App() {
  return (
<<<<<<< HEAD
    <Spreadsheets />
      

    // <BrowserRouter>
    //   <div className="App">
    //     <Switch>
    //       <Route exact path="/spreadsheets.js">
	  //   <LandingPage />
    //       </Route>
	  // <Route path="/login">
	  //   <Login />
	  // </Route>
	  // <Route path="/signup">
	  //   <Signup />
	  // </Route>
	  // <Route path="/admin">
	  //   <Admin />
	  // </Route>
    //     </Switch>
    //   </div>
    // </BrowserRouter>
=======
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
>>>>>>> main
  );
}


export default App;
