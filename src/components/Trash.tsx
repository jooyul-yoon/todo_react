import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import trashcan from "../icons/trash.png";

interface ITrashWrapper {
  isDraggingOver: Boolean;
  isDraggingFromThisWith: Boolean;
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
  margin-left: 80vw;
`;
const Trashcan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  margin: 20px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  box-shadow: black 1px 1px 5px -2px;
  transition: background-color 0.3s, width 0.3s, height 0.3s, border-radius 0.3s;
  img {
    max-width: 30px;
    transition: max-width 0.3s;
  }

  :hover {
    background-color: pink;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    img {
      max-width: 36px;
    }
  }
`;

function Trash() {
  return (
    <Wrapper>
      <Droppable droppableId="delete">
        {(magic) => (
          <Trashcan ref={magic.innerRef} {...magic.droppableProps}>
            <img src={trashcan} alt="delete" />
          </Trashcan>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Trash;
