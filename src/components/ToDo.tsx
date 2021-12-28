import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

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

  const onDelete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.To_Do && (
        <button
          name={Categories.To_Do}
          onClick={() => onClick(Categories.To_Do)}
        >
          To Do
        </button>
      )}
      {category !== Categories.Doing && (
        <button
          name={Categories.Doing}
          onClick={() => onClick(Categories.Doing)}
        >
          Doing
        </button>
      )}
      {category !== Categories.Done && (
        <button name={Categories.Done} onClick={() => onClick(Categories.Done)}>
          Done
        </button>
      )}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default ToDo;
