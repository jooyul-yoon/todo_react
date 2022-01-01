import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo, toDoState } from "../../../atoms";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import React from "react";
import { useSetRecoilState } from "recoil";

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
interface IBoardProps {
  toDos: IToDo[];
  boardCategory: string;
}
function Board({ toDos, boardCategory }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IToDo>();
  const onValid = ({ text }: IToDo) => {
    setValue("text", "");
    setToDos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        category: boardCategory as IToDo["category"],
      },
    ]);
  };
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
            {toDos
              .filter((toDo) => toDo.category === boardCategory)
              .map((toDo, index) => (
                <DraggableCard
                  key={toDo.id}
                  id={toDo.id}
                  toDo={toDo.text}
                  category={toDo.category}
                  index={index}
                />
              ))}
            {magic.placeholder /* List Size stays */}
          </DropArea>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default React.memo(Board);
