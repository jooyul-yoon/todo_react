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
const ContainerLi = styled.li<{ isDragging: Boolean }>`
  /* transition: 1s; */
`;
const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
  margin: 0 15px;
  width: 150px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0 3px 0;
  color: black;
  span {
    padding-left: 10px;
  }
  button {
    text-align: center;
    padding-right: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
const Form = styled.form`
  display: flex;
  width: 100%;
  padding: 0 10px 5px 15px;
  input {
    background-color: transparent;
    align-items: center;
    border: none;
    outline: none;
    width: 100%;
    height: 25px;
    color: gray;
    font-size: 12px;
  }
`;
const Container = styled.div`
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 0;
`;
const DropArea = styled.div<IArea>`
  min-height: 44px;
  /* border-radius: 5px; */
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.accentColor
      : props.isDraggingFromThisWith
      ? props.theme.cardColor
      : props.theme.whiteColor};
  margin: 5px 10px;
  padding: 3px 5px;
  transition: background-color 0.3s ease-in-out;
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
      let toDostoRemove: IToDo[] = [];
      Object.keys(oldToDos).forEach((cat) => {
        if (cat !== deleteCat)
          copyToDos = { ...copyToDos, [cat]: [...oldToDos[cat]] as IToDo[] };
      });
      oldToDos[boardCategory].forEach((toDo) => toDostoRemove.push(toDo));
      const allToDos = oldToDos["All"].filter(
        (toDo) => !toDostoRemove.includes(toDo)
      );
      return { ...copyToDos, All: allToDos };
    });
  };
  localStorage.setItem("toDos", JSON.stringify(toDos));

  return (
    <Draggable draggableId={boardCategory} index={index}>
      {(magic, snapshot) => (
        <ContainerLi
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <Wrapper>
            <Title>
              <span>{boardCategory}</span>
              {boardCategory === "To Do" || boardCategory === "Done" ? null : (
                <button onClick={() => deleteCategory(boardCategory)}>x</button>
              )}
            </Title>
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
            </Container>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("text", { required: true })}
                type="text"
                placeholder="+ Add a task"
                autoComplete="off"
              />
            </Form>
          </Wrapper>
        </ContainerLi>
      )}
    </Draggable>
  );
}
export default React.memo(Board);
