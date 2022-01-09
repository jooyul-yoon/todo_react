import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../../../atoms";
import DeleteIcon from "../../../img/trash.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 10vw;
  margin: 20px 0;
`;
const Container = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NewBoardForm = styled.form``;
const NewBoardInput = styled.input`
  font-size: 10px;
  width: 70vw;
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
  background-color: #ffd9df;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  transition: background-color 0.3s, width 0.3s, height 0.3s, border-radius 0.3s;
  img {
    max-width: 30px;
  }
  :hover {
    background-color: white;
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
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ newCat }: IForm) => {
    setValue("newCat", "");
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
        <Droppable droppableId="delete" type="task">
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

export default React.memo(Footer);
