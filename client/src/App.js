//for browser routing
import { BrowserRouter, Switch, Route } from "react-router-dom";

//to show pop-up information
import { ToastContainer } from "react-toastify";

//default theme provide to modify it according to need
import theme from './components/Theme';


//components
import TopNav from "./components/TopNav";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import NewPasswordSetup from "./components/NewPasswordSetup";
import { ThemeProvider } from "@material-ui/styles";
import Home from "./components/Home";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <TopNav />
        <ToastContainer position="top-center" />

        <Switch>
          <Route exact path="/" component={Home} />
          {/* route for login and register */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          {/* route for reset and change password */}
          <Route exact path="/resetPassword" component={ResetPassword} />
          <Route
            exact
            path="/resetPassword/:token"
            component={NewPasswordSetup}
          />

          {/* protected route */}
          <PrivateRoute exact path="/profile" component={Profile} />

        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;