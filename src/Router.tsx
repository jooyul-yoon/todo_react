import { BrowserRouter, Route, Switch } from "react-router-dom";
import ToDoList from "./components/todo_components/list/ToDoList";
import Trello from "./components/todo_components/trello/Trello";

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
