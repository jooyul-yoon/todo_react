import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryAtom, IToDo, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  // Recoil
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryAtom);

  // React-Hook-Form
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((prev) => [
      { text: toDo, id: Date.now(), category: category as IToDo["category"] },
      ...prev,
    ]);
    setValue("toDo", ""); // Make empty textfield after input
  };
  localStorage.setItem("toDos", JSON.stringify(toDos));

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a to do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
