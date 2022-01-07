import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import { categoryAtom, toDoSelector } from "../../../atoms";
import ToDo from "./ToDo";
import Navigator from "../../Navigator";
import Sidebar from "./Sidebar";

const Wrapper = styled.div`
  display: flex;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 20px auto;
  min-height: 100vh;
`;
const Header = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  h1 {
    font-size: 30px;
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
  margin: 10px 0;
`;

function ToDoList() {
  const category = useRecoilValue(categoryAtom);
  const toDos = useRecoilValue(toDoSelector);
  // const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
  //   setCategory(event.currentTarget.value as Categories);
  // };
  return (
    <>
      <Navigator />
      <Wrapper>
        <Sidebar />
        <Container>
          <Header>
            <h1>{category}</h1>
            {/* <select value={category} onInput={onInput}>
              <option value={Categories.To_Do}>To Do</option>
              <option value={Categories.Doing}>Doing</option>
              <option value={Categories.Done}>Done</option>
            </select> */}
          </Header>
          <CreateToDo />
          <ToDoListContainer>
            {toDos
              ? toDos.map((toDo) => {
                  return <ToDo key={toDo.id} {...toDo} />;
                })
              : null}
          </ToDoListContainer>
        </Container>
      </Wrapper>
    </>
  );
}

export default React.memo(ToDoList);
