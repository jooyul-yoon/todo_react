import { BrowserRouter, Route, Switch } from "react-router-dom";
import ToDoList from "./components/ToDoList";
import Trello from "./components/Trello";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/todo">
          <ToDoList />
        </Route>
        <Route path="/trello">
          <Trello />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
