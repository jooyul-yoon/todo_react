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
    console.log(info);
    const { destination, source, draggableId } = info;
    if (destination == null) return;

    // Define Categories and index
    const srcCategory = source.droppableId;
    const dstCategory = destination.droppableId;
    const srcIndex = source.index;
    const dstIndex = destination.index;

    // if dropped into trashcan, delete To Do
    if (dstCategory === "delete") {
      setToDos((oldToDos) => {
        Object.keys(oldToDos).forEach((cat) => {
          const targetIndex = oldToDos[cat].findIndex(
            (toDo) => toDo.id === Number(draggableId)
          );
          console.log(cat, targetIndex);
          if (targetIndex !== -1) {
            oldToDos = {
              ...oldToDos,
              [cat]: [
                ...oldToDos[cat].slice(0, targetIndex),
                ...oldToDos[cat].slice(targetIndex + 1),
              ],
            };
          }
        });
        return { ...oldToDos };
      });
    } else if (srcCategory !== dstCategory) {
      setToDos((oldToDos) => {
        const toDo: IToDo = {
          id: Number(draggableId),
          text: oldToDos[srcCategory][srcIndex].text,
        };
        const copyToDos = {
          ...oldToDos,
          [srcCategory]: [
            ...oldToDos[srcCategory].slice(0, srcIndex),
            ...oldToDos[srcCategory].slice(srcIndex + 1),
          ],
          [dstCategory]: [
            ...oldToDos[dstCategory].slice(0, dstIndex),
            toDo,
            ...oldToDos[dstCategory].slice(dstIndex),
          ],
        };
        return { ...copyToDos };
      });
    } else {
      setToDos((oldToDos) => {
        const toDo: IToDo = {
          id: Date.now(),
          text: oldToDos[srcCategory][srcIndex].text,
        };
        let copyToDos = {
          ...oldToDos,
          [srcCategory]: [
            ...oldToDos[srcCategory].slice(0, srcIndex),
            ...oldToDos[srcCategory].slice(srcIndex + 1),
          ],
        };
        copyToDos = {
          ...copyToDos,
          [dstCategory]: [
            ...copyToDos[dstCategory].slice(0, dstIndex),
            toDo,
            ...copyToDos[dstCategory].slice(dstIndex),
          ],
        };
        return { ...copyToDos };
      });
    }
  };
  return (
    <>
      <Navigator />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          {Object.keys(toDos).map((category) => {
            if (category === "All") return null;
            return <Board key={category} boardCategory={category} />;
          })}
        </Wrapper>
        <Trash />
      </DragDropContext>
    </>
  );
}

export default React.memo(Trello);
