import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryAtom } from "../../../atoms";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  border: 4px solid white;
  outline: none;
  width: 200px;
  height: inherit;
  padding: 10px 0;
  background-color: ${(props) => props.theme.boardColor};
  transition: 0.5s;
  input,
  button {
    width: 100%;
    background-color: transparent;
    border: none;
    padding: 10px 20px;
  }
  input {
    font-size: 20px;
    outline: none;
  }
  button {
    font-size: 18px;
    text-align: left;
    cursor: pointer;
    :hover {
      background-color: #d3d3d3;
    }
  }
  @media only screen and (min-width: 400px) {
    dispaly: none;
  }
`;
interface IForm {
  newCat: string;
}
function Sidebar() {
  const setCategory = useSetRecoilState(categoryAtom);
  const { register, handleSubmit, setValue, formState } = useForm<IForm>();
  const onClick = (category: Categories) => {
    setCategory(category);
  };
  const onValid = ({ newCat }: IForm) => {
    setValue("newCat", "");
    console.log(newCat);
  };
  const onInvalid = () => console.log(formState.errors);

  // console.log(watch());
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <input
          {...register("newCat", { required: true })}
          placeholder="+ New list"
        />
      </form>
      {Object.keys(Categories).map((category) => (
        <button key={category} onClick={() => onClick(category as Categories)}>
          {category === Categories.To_Do ? "To Do" : category}
        </button>
      ))}
    </Wrapper>
  );
}

export default Sidebar;
