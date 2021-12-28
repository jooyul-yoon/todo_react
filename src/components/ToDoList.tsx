import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import { Categories, categoryAtom, toDoSelector } from "../atoms";
import ToDo from "./ToDo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin: 0 auto;
`;
const Header = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding 0 20px;
  width: 100%;
  h1 {
    font-size: 30px;
    color: ${(props) => props.theme.accentColor};
  }
  Select {
    background: ${(props) => props.theme.cardColor};
    border-radius: 5px;
    padding: 10px;
    border: none;
    outline: none;
    color: ${(props) => props.theme.textColor};
    font-size: 13px;
    height: 40px;
  }
`;
const ToDoListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  height: 250px;
  margin: 10px 0;
`;

function ToDoList() {
  const [category, setCategory] = useRecoilState(categoryAtom);
  const toDos = useRecoilValue(toDoSelector);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };

  return (
    <Container>
      <Header>
        <h1>All</h1>
        <select value={category} onInput={onInput}>
          <option value={Categories.To_Do}>To Do</option>
          <option value={Categories.Doing}>Doing</option>
          <option value={Categories.Done}>Done</option>
        </select>
      </Header>
      <CreateToDo />
      <ToDoListContainer>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoListContainer>
    </Container>
  );
}

export default ToDoList;
