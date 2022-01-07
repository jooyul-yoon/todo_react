import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../../../atoms";
import DeleteIcon from "../../../img/trash.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 10vw;
`;
const Container = styled.div`
  width: 60px;
  height: 60px;
  /* height: 100px; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NewBoardForm = styled.form``;
const NewBoardInput = styled.input`
  width: 50vw;
  background-color: ${(props) => props.theme.cardColor};
  color: whitesmoke;
  font-size: 15px;
  padding: 15px 20px;
  border-radius: 5px;
  border: none;
  outline: none;
  ::placeholder {
    color: grey;
  }
`;
const DeleteBtn = styled.div`
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

interface IForm {
  newCat: string;
}
function Footer() {
  const { register, handleSubmit, formState, setValue } = useForm();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onValid = ({ newCat }: IForm) => {
    setValue("newCat", "");
    if (Object.keys(toDos).length > 10) {
      alert("You exceeded");
      return;
    }
    setToDos((oldToDos) => {
      return { ...oldToDos, [newCat]: [] as IToDo[] };
    });
  };
  const onInvalid = () => {
    console.log(formState.errors["newCat"].type);
  };
  return (
    <Wrapper>
      <NewBoardForm onSubmit={handleSubmit(onValid, onInvalid)}>
        <NewBoardInput
          autoComplete="off"
          {...register("newCat", {
            required: true,
            // minLength: 5,
            // maxLength: 15,
            // pattern: /[^a-zA-z]/gi,
          })}
          type="text"
          placeholder="+ Add new category"
        />
      </NewBoardForm>
      <Container>
        <Droppable droppableId="delete">
          {(magic) => (
            <DeleteBtn ref={magic.innerRef} {...magic.droppableProps}>
              <img src={DeleteIcon} alt="delete" />
            </DeleteBtn>
          )}
        </Droppable>
      </Container>
    </Wrapper>
  );
}

export default Footer;
