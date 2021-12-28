import { IToDo } from "../atoms";
function ToDo({ id, text }: IToDo) {
  return (
    <li>
      <span>{text}</span>
      <button>To Do</button>
      <button>Doing</button>
      <button>Done</button>
    </li>
  );
}

export default ToDo;
