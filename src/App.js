import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import { HomeLayout } from "./Layouts/HomeLayout";
import LoginLayout from "./Layouts/LoginLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Board from "./pages/Board/Board";
import Comments from "./pages/Comments/Comments";
import Profile from "./pages/Profile/Profile";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";

export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeLayout exact path='/board' component={Board} />
        <LoginLayout exact path='/register' component={Register} />
        <LoginLayout exact path='/login' component={Login} />
        <LoginLayout exact path='/profile' component={Profile} />
        <HomeLayout exact path='/project-management' component={ProjectManagement} />
        <HomeLayout exact path='/comment' component={Comments} />

        <HomeLayout exact path='/' component={Board} />
      </Switch>
    </Router>
  );
}

export default App;
