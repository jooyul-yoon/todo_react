import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
  margin: 0 15px;
  width: 180px;
  padding: 5px;
  border-radius: 5px;
  min-height: 50vh;
`;
const Title = styled.div`
  color: ${(props) => props.theme.blackColor};
`;
const DropArea = styled.div`
  height: 100%;
`;
interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic) => (
          <DropArea ref={magic.innerRef} {...magic.droppableProps}>
            {toDos
              .filter((toDo) => toDo.category === boardId)
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
