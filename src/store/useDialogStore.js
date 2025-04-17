import { create } from "zustand";

const useDialogStore = create((set) => ({
  isOpen: false,
  subredditName: "",
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
  setSubredditName: (name) => set({ subredditName: name }),
  resetSubredditName: () => set({ subredditName: "" }),
}));

export default useDialogStore;
