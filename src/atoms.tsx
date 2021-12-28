import { atom, selector } from "recoil";

export enum Categories {
  "To_Do" = "To_Do",
  "Doing" = "Doing",
  "Done" = "Done",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryAtom = atom<Categories>({
  key: "category",
  default: Categories.To_Do, // 0
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("toDos") as string),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryAtom);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
