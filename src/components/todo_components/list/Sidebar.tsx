import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryAtom, IToDo, toDoState } from "../../../atoms";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  border: 4px solid white;
  outline: none;
  max-width: 150px;
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
`;
interface IForm {
  newCat: string;
}

function Sidebar() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const setCategory = useSetRecoilState(categoryAtom);
  const { register, handleSubmit, setValue, formState } = useForm<IForm>();

  const onClick = (category: any) => {
    setCategory(category);
  };
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
  const onInvalid = () => console.log(formState.errors);
  const deleteCategory = (deleteCat: string) => {
    setToDos((oldToDos) => {
      let copyToDos = {};
      Object.keys(oldToDos).forEach((cat) => {
        if (cat !== deleteCat)
          copyToDos = { ...copyToDos, [cat]: [] as IToDo[] };
      });
      return { ...copyToDos };
    });
    setCategory("All");
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default React.memo(Sidebar);
