import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../atoms";

const Card = styled.li`
  display: flex;
  background-color: ${(props) => props.theme.cardColor};
  width: 100%;
  margin: 2px 0;
  padding: 5px;
  border-radius: 5px;
`;

interface ICardProps {
  toDo: IToDo;
  index: number;
}

function DraggableCard({ toDo, index }: ICardProps) {
  return (
    <Draggable key={toDo.id} draggableId={toDo.id.toString()} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo.text}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
