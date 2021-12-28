import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "To_Do" | "Doing" | "Done";
}

export const toDoState = atom<IToDo[]>({
  key: "toDO",
  default: [],
});
