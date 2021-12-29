import { atom, selector } from "recoil";

/* To Do List */
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

/* Trello */
export const minuteState = atom({ key: "minutes", default: 0 });

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return Math.round(minutes / 60);
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
