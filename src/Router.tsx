import { BrowserRouter, Route, Switch } from "react-router-dom";
import ToDoList from "./components/todo_components/list/ToDoList";
import Trello from "./components/todo_components/trello/Trello";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/todo/trello">
          <Trello />
        </Route>
        <Route path="/todo">
          <ToDoList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
