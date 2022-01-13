import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryAtom, IToDo, toDoState } from "../../../atoms";
import sidebarBtn from "../../../img/next.png";

const SideMenu = styled.div<{ isOpen: Boolean }>`
  position: fixed;
  top: 80px;
  left: ${(props) => (props.isOpen ? 0 : "-200px")};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  /* border: 4px solid white; */
  outline: none;
  width: 200px;
  padding: 10px 0;
  background-color: ${(props) => props.theme.sidebarColor};
  transition: 0.5s;
  input {
    width: 100%;
    background-color: transparent;
    border: none;
    padding: 10px 20px;
    text-align: left;
    font-size: 15px;
    width: 100%;
    outline: none;
    color: ${(props) => props.theme.bgColor};
    ::placeholder {
      color: ${(props) => props.theme.accentColor};
    }
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
  color: ${(props) => props.theme.bgColor};
  border: none;
  padding: 10px 20px;
  text-align: left;
  font-size: 15px;
  :hover {
    color: ${(props) => props.theme.textColor};
  }
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
    color: ${(props) => props.theme.textColor};
  }
`;
const SideBtn = styled.button<{ isOpen: Boolean }>`
  background-color: ${(props) => props.theme.accentColor};
  position: fixed;
  top: 50vh;
  left: ${(props) => (props.isOpen ? "180px" : "0px")};
  padding: 20px 0px;
  border: none;
  transition: 0.5s;
  cursor: pointer;
  img {
    height: 20px;
    transform: ${(props) => (props.isOpen ? "rotate(0.5turn)" : "0")};
  }
`;
interface IForm {
  newCat: string;
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState(
    JSON.parse(localStorage.getItem("isOpen") as string) ?? true
  );
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
  const onInvalid = () => {
    console.log(formState?.errors);
    const errors = formState?.errors["newCat"];
    const message = errors?.message;
    if (message!) alert(message);
  };
  const deleteCategory = (deleteCat: string) => {
    setToDos((oldToDos) => {
      let copyToDos = {};
      let toDostoRemove: IToDo[] = [];
      Object.keys(oldToDos).forEach((cat) => {
        if (cat !== deleteCat)
          copyToDos = { ...copyToDos, [cat]: [...oldToDos[cat]] as IToDo[] };
      });
      oldToDos[deleteCat].forEach((toDo) => toDostoRemove.push(toDo));
      const allToDos = oldToDos["All"].filter(
        (toDo) => !toDostoRemove.includes(toDo)
      );
      return { ...copyToDos, All: allToDos };
    });
    setCategory("All");
  };
  const sideOnClick = () => {
    setIsOpen(!isOpen);
  };
  localStorage.setItem("isOpen", JSON.stringify(isOpen));
  return (
    <>
      <SideMenu isOpen={isOpen}>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <input
            autoComplete="off"
            {...register("newCat", {
              required: true,
              minLength: { value: 4, message: "Too short" },
              maxLength: { value: 10, message: "Too long" },
            })}
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
