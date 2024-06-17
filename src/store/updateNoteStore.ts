import { create } from "zustand";
export type NoteProp ={
      id: string;
      title: string;
      content: string;
      image: string;
    }|{};

type UpdateNoteStore = {
  updateNote: NoteProp;
  addNote: (note: NoteProp) => void;
};

export const useUpdateStore = create<UpdateNoteStore>((set) => ({
  updateNote: {
    id: "1",
    title: "string",
    content: "Hello World",
    image: "hai",
  },
  addNote: (note: NoteProp) => {
    set(() => ({
      updateNote: note,
    }));
  },
}));
