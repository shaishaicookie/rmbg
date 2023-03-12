import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Rmbg from "./pages/Rmbg";
import Ack from "./pages/Ack";
import SignIn from "./pages/SignIn";

import { Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path="/rmbg">
          <Rmbg />
        </Route>
        <Route path="/ack">
          <Ack />
        </Route>
        <Route path="/sign">
          <SignIn />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
