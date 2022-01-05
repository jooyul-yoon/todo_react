import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo, toDoState } from "../../../atoms";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import React from "react";
import { useRecoilState } from "recoil";

interface IArea {
  isDraggingOver: Boolean;
  isDraggingFromThisWith: Boolean;
}
const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
  margin: 0 15px;
  width: 180px;
  border-radius: 5px;
  min-height: 50vh;
`;
const Title = styled.div`
  padding: 10px 0;
  font-weight: bold;
  color: ${(props) => props.theme.blackColor};
`;
const DropArea = styled.div<IArea>`
  width: inherit;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "pink"
      : props.isDraggingFromThisWith
      ? "blue"
      : "transparent"};
  height: 100%;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
`;
const Form = styled.form`
  display: flex;
  width: 100%;
  padding: 0 16px;
  input {
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    color: ${(props) => props.theme.bgColor};

    ::placeholder {
      color: ${(props) => props.theme.bgColor};
      font-weight: bold;
    }
  }
`;
const BoardRemoveBtn = styled.button`
  width: 100%;
  background-color: transparent;
  color: transparent;
  border: none;
  border-radius: inherit;
  padding: 5px 0;
  transition: 0.5s;
  font-weight: bold;
  :hover {
    background-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.cardColor};
  }
`;
interface IBoardProps {
  boardCategory: string;
}

function Board({ boardCategory }: IBoardProps) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IToDo>();
  const onValid = ({ text }: any) => {
    const newToDo: IToDo = { id: Date.now(), text };
    setValue("text", "");
    setToDos((prev) => {
      return {
        ...prev,
        All: [...prev["All"], newToDo],
        [boardCategory]: [...prev[boardCategory], newToDo],
      };
    });
  };
  const deleteCategory = (deleteCat: string) => {
    setToDos((oldToDos) => {
      let copyToDos = {};
      Object.keys(oldToDos).forEach((cat) => {
        if (cat !== deleteCat)
          copyToDos = { ...copyToDos, [cat]: [] as IToDo[] };
      });
      console.log("CT", Object.keys(copyToDos));
      return { ...copyToDos };
    });
  };
  localStorage.setItem("toDos", JSON.stringify(toDos));

  return (
    <Wrapper>
      <Title>{boardCategory}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("text", { required: true })}
          type="text"
          placeholder="Add a task"
        />
      </Form>
      <Droppable droppableId={boardCategory}>
        {(magic, snapshot) => (
          <DropArea
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos[boardCategory].map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                id={toDo.id}
                toDo={toDo.text}
                index={index}
              />
            ))}
            {magic.placeholder /* List Size stays */}
          </DropArea>
        )}
      </Droppable>
      {boardCategory === "To Do" || boardCategory === "Done" ? null : (
        <BoardRemoveBtn onClick={() => deleteCategory(boardCategory)}>
          Remove
        </BoardRemoveBtn>
      )}
    </Wrapper>
  );
}
export default React.memo(Board);
