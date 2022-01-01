import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import trashcan from "../../../img/trash.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100%;
  padding: 0 20px;
`;
const Container = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Trashcan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  box-shadow: black 0px 0px 3px;
  transition: background-color 0.3s, width 0.3s, height 0.3s, border-radius 0.3s;
  img {
    max-width: 30px;
  }
  :hover {
    background-color: pink;
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
`;

function Trash() {
  return (
    <Wrapper>
      <Container>
        <Droppable droppableId="delete">
          {(magic) => (
            <Trashcan ref={magic.innerRef} {...magic.droppableProps}>
              <img src={trashcan} alt="delete" />
            </Trashcan>
          )}
        </Droppable>
      </Container>
    </Wrapper>
  );
}

export default Trash;
