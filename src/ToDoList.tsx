import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [todo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(todo);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={todo} placeholder="write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
} */

interface IForm {
  username: string;
  password: string;
  password1: string;
  firstname: string;
  lastname: string;
  email: string;
}

function ToDoList() {
  const { register, watch, handleSubmit, formState, setError } = useForm<IForm>(
    {
      defaultValues: { email: "@naver.com" },
    }
  );
  // console.log(watch());
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError("password1", { message: "Passwords are not the same" });
    }
  };
  const onInvalid = (data: any) => {
    console.log(formState.errors);
  };
  const { errors } = formState;
  // console.log(watch());
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
        <input
          {...register("username", {
            required: true,
            minLength: { value: 10, message: "Username is too short" },
          })}
          placeholder="username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", { required: true })}
          placeholder="password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", { required: true })}
          placeholder="password1"
        />
        <span>{errors?.password1?.message}</span>
        <input
          {...register("firstname", { required: true })}
          placeholder="first name"
        />
        <span>{errors?.firstname?.message}</span>
        <input
          {...register("lastname", { required: true })}
          placeholder="last name"
        />
        <span>{errors?.lastname?.message}</span>
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Use Naver Email",
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
