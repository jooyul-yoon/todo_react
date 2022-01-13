import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.li<{ isDragging: Boolean }>`
  display: flex;
  background-color: ${(props) =>
    props.isDragging ? props.theme.darkAccent : props.theme.whiteColor};
  color: ${(props) =>
    props.isDragging ? props.theme.whiteColor : props.theme.blackColor};
  width: 100%;
  margin: 8px 0;
  padding: 5px;
  border-left: 2px solid ${(props) => props.theme.accentColor};
  box-shadow: ${(props) =>
    props.isDragging
      ? "black 0px 2px 5px"
      : "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;"};
  font-size: 12px;
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
