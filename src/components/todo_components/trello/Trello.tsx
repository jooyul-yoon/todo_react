import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../../../atoms";
import Board from "./Board";
import Navigator from "../../Navigator";
import Trash from "./Trash";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  margin: 20px auto;
`;
function Trello() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    // const { destination, source, draggableId } = info;
    // console.log(info);
    // if (destination == null) return;
    // // find source index
    // const srcIndex = toDos.findIndex(
    //   (toDo) => toDo.id.toString() === draggableId
    // );
    // // if dropped into trashcan, delete To Do
    // if (destination.droppableId === "delete") {
    //   setToDos((oldToDos) => {
    //     return [
    //       ...oldToDos.slice(0, srcIndex),
    //       ...oldToDos.slice(srcIndex + 1),
    //     ];
    //   });
    //   return;
    // }
    // // find destination index
    // const dstToDo = toDos.filter(
    //   (toDos) => toDos.category === destination.droppableId
    // )[destination.index];
    // let dstIndex = toDos.findIndex((toDo) => toDo === dstToDo);
    // if (srcIndex < dstIndex && dstToDo.category === source.droppableId)
    //   dstIndex += 1;
    // if (srcIndex < dstIndex) dstIndex -= 1;
    // setToDos((oldToDos) => {
    //   const copyToDos = [...oldToDos];
    //   if (dstIndex !== null) {
    //     const [srcToDo] = copyToDos.splice(srcIndex, 1)!;
    //     const toDo: IToDo = {
    //       text: srcToDo.text,
    //       id: Date.now(),
    //       category: destination.droppableId as IToDo["category"],
    //     };
    //     copyToDos.splice(dstIndex, 0, toDo);
    //   }
    //   return [...copyToDos];
    // });
  };
  return (
    <>
      <Navigator />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          {/* {Object.keys(Categories).map((category) => (
            <Board key={category} toDos={toDos} boardCategory={category} />
          ))} */}
        </Wrapper>
        <Trash />
      </DragDropContext>
    </>
  );
}

export default React.memo(Trello);
