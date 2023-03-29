import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";

function App() {
  return (
    <Switch>
      {/* <h1>Hello from App</h1> */}
      <Route path="/login" component={LoginFormPage}/>
    </Switch>
  );
}

export default App;
