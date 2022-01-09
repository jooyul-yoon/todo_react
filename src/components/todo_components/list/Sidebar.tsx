import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryAtom, IToDo, toDoState } from "../../../atoms";
import sidebarBtn from "../../../img/next.png";

const SideMenu = styled.div<{ isOpen: Boolean }>`
  position: fixed;
  top: 80px;
  left: ${(props) => (props.isOpen ? 0 : "-195px")};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  border: 4px solid white;
  outline: none;
  width: 200px;
  padding: 10px 0;
  background-color: ${(props) => props.theme.boardColor};
  transition: 0.5s;
  input {
    width: 100%;
    background-color: transparent;
    border: none;
    padding: 10px 20px;
    text-align: left;
  }
  input {
    font-size: 15px;
    width: 100%;
    outline: none;
    color: ${(props) => props.theme.bgColor};
  }
  @media only screen and (min-width: 400px) {
    dispaly: none;
  }
`;
const CategoryArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  :hover {
    background-color: #d3d3d3;
  }
`;
const CategoryBtn = styled.button`
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  text-align: left;
  font-size: 15px;
`;
const RemoveBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  text-align: left;
  font-size: 15px;
  text-align: right;
  color: red;
  cursor: pointer;
  :hover {
    background-color: #ff00006e;
  }
`;
const SideBtn = styled.button<{ isOpen: Boolean }>`
  background-color: transparent;
  position: fixed;
  top: 50vh;
  left: ${(props) => (props.isOpen ? "180px" : "2px")};
  padding: 20px 0px;
  border: none;
  transition: 0.5s;
  img {
    height: 20px;
    transform: ${(props) => (props.isOpen ? "rotate(0.5turn)" : "0")};
  }
  :hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;
interface IForm {
  newCat: string;
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const setCategory = useSetRecoilState(categoryAtom);
  const { register, handleSubmit, setValue, formState } = useForm<IForm>();

  const onClick = (category: any) => {
    setCategory(category);
  };
  const onValid = ({ newCat }: IForm) => {
    setValue("newCat", "");
    if (Object.keys(toDos).length > 7) {
      alert("No more than 7 categories");
      return;
    }
    setToDos((oldToDos) => {
      return { ...oldToDos, [newCat]: [] as IToDo[] };
    });
  };
  const onInvalid = () => console.log(formState.errors);
  const deleteCategory = (deleteCat: string) => {
    setToDos((oldToDos) => {
      let copyToDos = {};
      return { ...copyToDos };
    });
    setCategory("All");
  };
  const sideOnClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <SideMenu isOpen={isOpen}>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <input
            autoComplete="off"
            {...register("newCat", { required: true })}
            placeholder="+ New list"
          />
        </form>
        {Object.keys(toDos).map((category) => {
          return category === "All" ||
            category === "To Do" ||
            category === "Done" ? (
            <CategoryArea key={category}>
              <CategoryBtn onClick={() => onClick(category)}>
                {category}
              </CategoryBtn>
            </CategoryArea>
          ) : (
            <CategoryArea key={category}>
              <CategoryBtn onClick={() => onClick(category)}>
                {category}
              </CategoryBtn>
              <RemoveBtn onClick={() => deleteCategory(category)}>-</RemoveBtn>
            </CategoryArea>
          );
        })}
      </SideMenu>
      <SideBtn onClick={sideOnClick} isOpen={isOpen}>
        <img src={sidebarBtn} alt="sidebarBtn" />
      </SideBtn>
    </>
  );
}

export default React.memo(Sidebar);
