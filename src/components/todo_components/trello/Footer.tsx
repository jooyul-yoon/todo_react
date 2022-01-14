import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../../../atoms";
import DeleteIcon from "../../../img/trash.png";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 60px;
  padding: 0 10vw;
  margin-left: 10px;
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
  width: 20vw;
  min-width: 180px;
  height: 30px;
  background-color: ${(props) => props.theme.whiteColor};
  color: black;
  font-size: 15px;
  padding: 15px 20px;
  border-radius: 5px;
  border: none;
  outline: none;
`;
const DeleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  color: black;
  width: 50px;
  height: 50px;
  font-size: 30px;
  border-radius: 25px;
  transition: 0.3s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  img {
    max-width: 30px;
  }
  :hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

interface IForm {
  newCat: string;
}
function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState, setValue } = useForm();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ newCat }: IForm) => {
    toggleIsOpen();
    setValue("newCat", "");
    setToDos((oldToDos) => {
      return { ...oldToDos, [newCat]: [] as IToDo[] };
    });
  };
  const onInvalid = () => {
    console.log(formState?.errors);
    const errors = formState?.errors["newCat"];
    const message = errors?.message;
    if (message!) alert(message);
  };
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
    setValue("newCat", "");
  };
  return (
    <Wrapper>
      <Container>
        <DeleteBtn onClick={toggleIsOpen}>+</DeleteBtn>
      </Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleIsOpen}
        contentLabel="My dialog"
        style={{
          overlay: {
            position: "fixed",
            zIndex: 1020,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(63, 63, 63, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            padding: "0",
            margin: "0 0 100px 0",
            background: "transparent",
            overflowY: "auto",
            position: "relative",
            border: "1px solid transparent",
          },
        }}
      >
        {isOpen ? (
          <NewBoardForm onSubmit={handleSubmit(onValid, onInvalid)}>
            <NewBoardInput
              autoComplete="off"
              {...register("newCat", {
                required: true,
                minLength: { value: 4, message: "Too short" },
                maxLength: { value: 10, message: "Too long" },
                // pattern: /[^a-zA-z]/gi,
              })}
              type="text"
              placeholder="+ Add new category"
            />
          </NewBoardForm>
        ) : null}
      </Modal>

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
