import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../atoms";
import DraggableCard from "./DraggableCard";
import { useRef } from "react";

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
  padding-top: 10px;
  font-weight: bold;
  color: ${(props) => props.theme.blackColor};
`;
const DropArea = styled.div<IArea>`
  width: inherit;
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
interface IBoardProps {
  toDos: IToDo[];
  boardCategory: string;
}

function Board({ toDos, boardCategory }: IBoardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.focus();
    setTimeout(() => {
      inputRef.current?.blur();
    }, 5000);
  };
  return (
    <Wrapper>
      <Title>{boardCategory}</Title>
      <input ref={inputRef} placeholder="Grabme" />
      <button onClick={onClick}>Click me</button>
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
                <DraggableCard key={toDo.id} toDo={toDo} index={index} />
              ))}
            {magic.placeholder /* List Size stays */}
          </DropArea>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
