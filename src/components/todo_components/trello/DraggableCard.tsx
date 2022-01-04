import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.li<{ isDragging: Boolean }>`
  display: flex;
  background-color: ${(props) =>
    props.isDragging ? props.theme.redColor : props.theme.cardColor};
  width: 100%;
  margin: 2px 0;
  padding: 5px;
  border-radius: 5px;
  box-shadow: ${(props) => (props.isDragging ? "black 0px 2px 5px" : "none")};
`;

interface ICardProps {
  id: number;
  toDo: string;
  index: number;
}

function DraggableCard({ id, toDo, index }: ICardProps) {
  return (
    <Draggable key={id} draggableId={id + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
