import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, toDoState } from "../../../atoms";

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
  color: ${(props) => props.theme.accentColor};
  border: none;
  outline: none;
  ::placeholder {
    color: ${(props) => props.theme.accentColor};
  }
`;
const AddBtn = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.accentColor};
  margin-right: 5px;
  cursor: pointer;
`;
interface IForm {
  toDo: string;
}

function CreateToDo() {
  // Recoil
  const [toDos, setToDos] = useRecoilState(toDoState);

  // React-Hook-Form
  const { register, handleSubmit, setValue, formState } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDos((prev) => [
      ...prev,
      { text: toDo, id: Date.now(), category: Categories.To_Do },
    ]);
    setValue("toDo", ""); // Make empty textfield after input
  };
  const onInvalid = () => console.log(formState.errors);
  localStorage.setItem("toDos", JSON.stringify(toDos));

  return (
    <AddContainer>
      <AddBtn>+</AddBtn>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <AddInput
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
