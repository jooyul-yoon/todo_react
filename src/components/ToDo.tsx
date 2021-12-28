import React from "react";
import { IToDo } from "../atoms";

function ToDo({ text, category }: IToDo) {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    console.log(name);
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "To_Do" && (
        <button name="To_Do" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "Doing" && (
        <button name="Doing" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "Done" && (
        <button name="Done" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
