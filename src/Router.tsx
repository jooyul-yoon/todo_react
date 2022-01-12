import { BrowserRouter, Route, Switch } from "react-router-dom";
import ToDoList from "./components/todo_components/list/ToDoList";
import Trello from "./components/todo_components/trello/Trello";
import Navigator from "./components/Navigator";
import Framer from "./components/todo_components/framer/Framer";
import Coin from "./components/crypto/Coin";
import Coins from "./components/crypto/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/react/crypto_tracker/:cId">
          <Coin />
        </Route>
        <Route path="/react/crypto_tracker">
          <Coins />
        </Route>
        <Route path="/react/todo">
          <ToDoList />
        </Route>
        <Route path="/react/trello">
          <Trello />
        </Route>
        <Route path="/react/animation">
          <Framer />
        </Route>
        <Route path="/react">
          <Navigator />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
