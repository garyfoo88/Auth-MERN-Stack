import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
          <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
