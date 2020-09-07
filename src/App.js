import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams
} from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

//scss
import './css/popup.scss'
import './css/main.scss'

//view
import Home from "./view/home";
import Can from "./view/Can";
import Written from "./view/Written";
import Signin from "./view/Signin";
import Signup from "./view/Signup";
import PlanRegister from "./view/admin/PlanRegister";
import PrivateRoute from './view/PrivateRoute';
import Assignment from "./view/admin/Assignment";
//css
import './App.scss';


function App() {
  return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/can" component={Can}/>
          <PrivateRoute exact path="/written" component={Written} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />

          {/*adminなのであとで変更*/}
          <Route exact path="/planregist" component={PlanRegister} />
          <Route exact path="/assignment" component={Assignment} />
          
          <Route render={() => <h1>ページが見つかりません</h1>} />
        </Switch>
      </Router>
  );
}




export default App;
