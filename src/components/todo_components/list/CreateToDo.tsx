import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryAtom, IToDo, toDoState } from "../../../atoms";

const AddContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 10px 0;
  padding: 10px 5px;
  background: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  width: 100%;
`;
const AddInput = styled.input`
  width: 40vw;
  background: transparent;
  color: ${(props) => props.theme.lightGrayColor};
  border: none;
  outline: none;
  ::placeholder {
    color: ${(props) => props.theme.lightGrayColor};
  }
`;
const AddBtn = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.lightGrayColor};
  margin-right: 5px;
  cursor: pointer;
`;
interface IForm {
  toDo: string;
}

function CreateToDo() {
  // Recoil
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryAtom);

  // React-Hook-Form
  const { register, handleSubmit, setValue, formState } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo: IToDo = { id: Date.now(), text: toDo };
    setValue("toDo", ""); // Make empty textfield after input
    if (category === "All") {
      setToDos((prev) => {
        return {
          ...prev,
          All: [...prev["All"], newToDo],
          "To Do": [...prev["To Do"], newToDo],
        };
      });
    } else {
      setToDos((prev) => {
        return {
          ...prev,
          All: [...prev["All"], newToDo],
          [category]: [...prev[category], newToDo],
        };
      });
    }
  };
  const onInvalid = () => console.log(formState.errors);
  localStorage.setItem("toDos", JSON.stringify(toDos));
  // console.log(toDos);
  return (
    <AddContainer>
      <AddBtn>+</AddBtn>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <AddInput
          autoComplete="off"
          {...register("toDo", {
            required: "Please write a to do",
          })}
          placeholder="Add a task"
        />
      </form>
    </AddContainer>
  );
}

export default CreateToDo;
