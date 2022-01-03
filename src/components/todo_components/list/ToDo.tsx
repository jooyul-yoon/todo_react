import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryAtom, IToDo, toDoState } from "../../../atoms";

const ToDoCard = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.cardColor};
  margin: 1px 0;
  padding: 10px 5px;
  border-radius: 5px;
  font-size: 13px;
  height: 70px;
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
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SelectStyle = styled.select`
  margin-bottom: 10px;
  background-color: transparent;
  color: white;
  border: none;
`;
function ToDo({ text, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const currCat = useRecoilValue(categoryAtom);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const newCat = event.currentTarget.value;
    setToDos((oldToDos) => {
      const toDosFrom = oldToDos[currCat];
      const toDosTo = oldToDos[newCat];
      const targetIndex = toDosFrom.findIndex((toDo) => toDo.id === id);
      const newToDo: IToDo = { id, text };

      return {
        ...oldToDos,
        [currCat]: [
          ...toDosFrom.slice(0, targetIndex),
          ...toDosFrom.slice(targetIndex + 1),
        ],
        [newCat]: [...toDosTo, newToDo],
      };
    });
  };
  const onDelete = () => {
    setToDos((oldToDos) => {
      Object.keys(oldToDos).forEach((cat) => {
        const targetIndex = oldToDos[cat].findIndex((toDo) => toDo.id === id);
        // console.log(cat, targetIndex);
        if (targetIndex !== -1) {
          oldToDos = {
            ...oldToDos,
            [cat]: [
              ...oldToDos[cat].slice(0, targetIndex),
              ...oldToDos[cat].slice(targetIndex + 1),
            ],
          };
        }
      });
      return oldToDos;
    });
  };

  return (
    <ToDoCard>
      <span>{text}</span>
      {currCat === "All" ? null : (
        <BtnContainer>
          <SelectStyle onInput={onInput}>
            <option>Select</option>
            {Object.keys(toDos).map((newCat) => {
              if (newCat === "All" || newCat === currCat) return null;
              return <option value={newCat}>{newCat}</option>;
            })}
          </SelectStyle>
          <button onClick={onDelete}>Delete</button>
        </BtnContainer>
      )}
    </ToDoCard>
  );
}

export default ToDo;
