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
import './css/mbwStyle.scss'

//view
import Home from "./view/home";
import Can from "./view/Can";
import Can_edit from "./view/can/edit";
import Written from "./view/Written";
import Signin from "./view/Signin";
import Signup from "./view/Signup";
import Inspection from "./view/admin/Inspection"
import PlanRegister from "./view/admin/PlanRegister";
import PrivateRoute from './view/PrivateRoute';
import AdminRoute from './view/AdminRoute';
import Assignment from "./view/admin/Assignment";
//css
import './App.scss';


function App() {
  return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/can" component={Can}/>
          <PrivateRoute exact path="/can/:key" component={Can_edit}/>
          <PrivateRoute exact path="/written" component={Written} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />

          {/*adminなのであとで変更*/}
          <AdminRoute exact path="/planregist" component={PlanRegister} />
          <AdminRoute exact path="/assignment" component={Assignment} />
          <AdminRoute exact path="/assignment/:key" component={Inspection} />
          
          <Route render={() => <h1>ページが見つかりません</h1>} />
        </Switch>
      </Router>
  );
}




export default App;
