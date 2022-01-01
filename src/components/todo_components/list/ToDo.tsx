import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../../../atoms";

const ToDoCard = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.cardColor};
  margin: 1px 0;
  padding: 10px 5px;
  border-radius: 5px;
  font-size: 13px;
  span {
    margin-left: 10px;
    color: ${(props) => props.theme.textColor};
  }
  button {
    margin-left: 10px;
    background: transparent;
    border: none;
    color: ${(props) => props.theme.textColor};
    font-size: 10px;
    cursor: pointer;
  }
`;
const BtnContainer = styled.div``;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory as IToDo["category"] };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const onDelete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <ToDoCard>
      <span>{text}</span>
      <BtnContainer>
        {category !== Categories.To_Do && (
          <button
            name={Categories.To_Do}
            onClick={() => onClick(Categories.To_Do)}
          >
            To Do
          </button>
        )}
        {category !== Categories.Doing && (
          <button
            name={Categories.Doing}
            onClick={() => onClick(Categories.Doing)}
          >
            Doing
          </button>
        )}
        {category !== Categories.Done && (
          <button
            name={Categories.Done}
            onClick={() => onClick(Categories.Done)}
          >
            Done
          </button>
        )}
        <button onClick={onDelete}>Delete</button>
      </BtnContainer>
    </ToDoCard>
  );
}

export default ToDo;
