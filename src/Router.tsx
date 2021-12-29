import { BrowserRouter, Route, Switch } from "react-router-dom";
import ToDoList from "./components/ToDoList";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/todo">
          <ToDoList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
