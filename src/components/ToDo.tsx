import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory as IToDo["category"] };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "To_Do" && (
        <button name="To_Do" onClick={() => onClick("To_Do")}>
          To Do
        </button>
      )}
      {category !== "Doing" && (
        <button name="Doing" onClick={() => onClick("Doing")}>
          Doing
        </button>
      )}
      {category !== "Done" && (
        <button name="Done" onClick={() => onClick("Done")}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
