import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Navigator from "./Navigator";

function Trello() {
  const onDragEnd = () => {};
  return (
    <>
      <Navigator />
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="one">
            {(magic) => (
              <ul ref={magic.innerRef} {...magic.droppableProps}>
                <Draggable draggableId="first" index={0}>
                  {(magic) => (
                    <li ref={magic.innerRef} {...magic.draggableProps}>
                      <span {...magic.dragHandleProps}>🔥</span>
                      First
                    </li>
                  )}
                </Draggable>
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
}

export default Trello;
