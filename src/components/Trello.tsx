import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, toDoState } from "../atoms";
import Navigator from "./Navigator";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  margin: 30px auto;
`;
const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const Board = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
  margin: 0 15px;
  width: 180px;
  padding: 5px;
  border-radius: 5px;
  min-height: 100px;
`;
const Card = styled.li`
  display: flex;
  background-color: ${(props) => props.theme.cardColor};
  width: 100%;
  margin: 2px 0;
  padding: 5px;
  border-radius: 5px;
`;
function Trello() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination == null) return;
    const srcIndex = source.index;
    const dstIndex = destination?.index;
    setToDos((oldToDos) => {
      const copyToDos = [...oldToDos];
      if (dstIndex !== null) {
        const srcToDo = copyToDos.splice(srcIndex, 1)!;
        // console.log(srcToDo);
        copyToDos.splice(dstIndex, 0, ...srcToDo);
      }
      return [...copyToDos];
    });
  };

  return (
    <>
      <Navigator />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId={Categories.To_Do}>
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <Draggable
                      key={toDo.id}
                      draggableId={toDo.id.toString()}
                      index={index}
                    >
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
                  ))}
                  {magic.placeholder /* List Size stays */}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default Trello;
