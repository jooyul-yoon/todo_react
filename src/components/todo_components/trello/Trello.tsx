import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../../../atoms";
import Board from "./Board";
import Navigator from "../../Navigator";
import Footer from "./Footer";

interface IArea {
  isDraggingOver: Boolean;
  isDraggingFromThisWith: Boolean;
}
const Wrapper = styled.ul`
  background-color: ${(props) => props.theme.cardColor};
  display: flex;
  max-width: 80vw;
  margin: 20px 10vw 5px 10vw;
  padding: 20px;
  border-radius: 5px;
`;
const DropArea = styled.div<IArea>`
  transition: 0.5s;
  display: flex;
  width: 100%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function Trello() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source, draggableId, type } = info;
    if (destination == null) return;
    /* Define Categories and index */
    const srcDropId = source.droppableId;
    const dstDropId = destination.droppableId;
    const srcIndex = source.index;
    const dstIndex = destination.index;
    /* BOARD DRAG */
    switch (type) {
      default:
        return;
      /* BOARD DND */
      case "board": {
        setToDos((oldToDos) => {
          let copyToDos = {};
          let srcCat: string;
          let srcToDos: IToDo[] = [];
          let newToDos = {};
          /* Delete source todo */
          Object.keys(oldToDos).forEach((cat) => {
            if (cat === draggableId) {
              srcCat = cat;
              srcToDos = oldToDos[cat];
            } else copyToDos = { ...copyToDos, [cat]: [] as IToDo[] };
          });
          /* Add in the middle */
          Object.keys(copyToDos).forEach((cat, index) => {
            if (dstIndex - index === 0) {
              newToDos = { ...newToDos, [srcCat]: srcToDos };
            }
            newToDos = { ...newToDos, [cat]: oldToDos[cat] };
          });
          if (dstIndex === Object.keys(toDos).length - 1) {
            newToDos = { ...newToDos, [srcCat!]: srcToDos };
          }
          return { ...newToDos };
        });
        break;
      }
      /* TASK DND */
      case "task": {
        // if dropped into trashcan, delete To Do
        if (dstDropId === "delete") {
          setToDos((oldToDos) => {
            Object.keys(oldToDos).forEach((cat) => {
              const targetIndex = oldToDos[cat].findIndex(
                (toDo) => toDo.id === Number(draggableId)
              );
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
        } else if (srcDropId !== dstDropId) {
          setToDos((oldToDos) => {
            const toDo: IToDo = {
              id: Number(draggableId),
              text: oldToDos[srcDropId][srcIndex].text,
            };
            const copyToDos = {
              ...oldToDos,
              [srcDropId]: [
                ...oldToDos[srcDropId].slice(0, srcIndex),
                ...oldToDos[srcDropId].slice(srcIndex + 1),
              ],
              [dstDropId]: [
                ...oldToDos[dstDropId].slice(0, dstIndex),
                toDo,
                ...oldToDos[dstDropId].slice(dstIndex),
              ],
            };
            return { ...copyToDos };
          });
        } else {
          setToDos((oldToDos) => {
            const toDo: IToDo = {
              id: Date.now(),
              text: oldToDos[srcDropId][srcIndex].text,
            };
            let copyToDos = {
              ...oldToDos,
              [srcDropId]: [
                ...oldToDos[srcDropId].slice(0, srcIndex),
                ...oldToDos[srcDropId].slice(srcIndex + 1),
              ],
            };
            copyToDos = {
              ...copyToDos,
              [dstDropId]: [
                ...copyToDos[dstDropId].slice(0, dstIndex),
                toDo,
                ...copyToDos[dstDropId].slice(dstIndex),
              ],
            };
            return { ...copyToDos };
          });
        }
        break;
      }
    }
  };

  // console.log(toDos);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Navigator />
      <Footer />
      <Wrapper>
        <Droppable droppableId={"boards"} direction="horizontal" type="board">
          {(magic, snapshot) => (
            <DropArea
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {Object.keys(toDos).map((category, index) => {
                if (category === "All") return null;
                return (
                  <Board
                    key={category}
                    boardCategory={category}
                    index={index}
                  />
                );
              })}
              {magic.placeholder}
            </DropArea>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default React.memo(Trello);
