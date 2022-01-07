import { Draggable, Droppable } from "react-beautiful-dnd";
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
const ListContainer = styled.li<{ isDragging: Boolean }>`
  /* transition: 1s; */
`;
const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
  margin: 0 15px;
  width: 180px;
  border-radius: 5px;
`;
const Title = styled.div`
  padding: 10px 0;
  font-weight: bold;
  color: ${(props) => props.theme.blackColor};
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
const Container = styled.div`
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;
const DropArea = styled.div<IArea>`
  min-height: 100px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "pink"
      : props.isDraggingFromThisWith
      ? "blue"
      : "transparent"};
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
`;
const BoardRemoveBtn = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.accentColor};
  border: none;
  border-radius: 5px;
  padding: 5px 0;
  transition: 0.5s;
  :hover {
    color: ${(props) => props.theme.cardColor};
  }
`;
interface IBoardProps {
  boardCategory: string;
  index: number;
}

function Board({ boardCategory, index }: IBoardProps) {
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
      return { ...copyToDos };
    });
  };
  localStorage.setItem("toDos", JSON.stringify(toDos));

  return (
    <Draggable draggableId={boardCategory} index={index}>
      {(magic, snapshot) => (
        <ListContainer
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <Wrapper>
            <Title>{boardCategory}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("text", { required: true })}
                type="text"
                placeholder="Add a task"
                autoComplete="off"
              />
            </Form>
            <Container>
              <Droppable droppableId={boardCategory} type="task">
                {(magic, snapshot) => (
                  <DropArea
                    isDraggingOver={snapshot.isDraggingOver}
                    isDraggingFromThisWith={Boolean(
                      snapshot.draggingFromThisWith
                    )}
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
            </Container>
          </Wrapper>
        </ListContainer>
      )}
    </Draggable>
  );
}
export default React.memo(Board);
