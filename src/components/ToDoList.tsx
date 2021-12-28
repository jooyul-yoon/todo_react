import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryAtom, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const [category, setCategory] = useRecoilState(categoryAtom);
  const toDos = useRecoilValue(toDoSelector);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.To_Do}>To Do</option>
        <option value={Categories.Doing}>Doing</option>
        <option value={Categories.Done}>Done</option>
      </select>
      <CreateToDo />
      <hr />
      <h1>{category}</h1>
      <hr />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
