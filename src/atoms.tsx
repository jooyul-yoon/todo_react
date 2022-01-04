import { atom, selector } from "recoil";

/* To Do List */
export interface IToDo {
  text: string;
  id: number;
}
interface IToDoState {
  [category: string]: IToDo[];
}

export const categoryAtom = atom({
  key: "category",
  default: "To Do",
});

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("toDos") as string),
  // default: { All: [], "To Do": [], Done: [] },
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryAtom);
    return toDos[category];
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
