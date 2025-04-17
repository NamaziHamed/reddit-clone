import React from "react";
import { FaPlus, FaRedditAlien } from "react-icons/fa6";
import useDialogStore from "../store/useDialogStore";
import AddSubredditDialog from "./AddSubredditDialog";

function Navbar() {
  const openDialog = useDialogStore((state) => state.openDialog);

  return (
    <>
      <nav
        className="fixed top-0 left-0 min-h-screen max-w-1/5 px-4 
    py-2 bg-zinc-900 z-50"
      >
        <div className="flex flex-col gap-3 items-center">
          <div className="flex items-center gap-2">
            <FaRedditAlien className="w-10 h-10 text-orange-500" />
            <span className="text-lg md:text-2xl lg:text-3xl font-bold">
              Reddit Clone
            </span>
          </div>
          <div></div>
          <div className="absolute bottom-10">
            <button
              onClick={openDialog}
              className="bg-orange-500 rounded-full px-4 py-2 
              flex items-center gap-1 lg:text-lg hover:bg-orange-600 transition-colors"
            >
              <FaPlus className="inline" /> Add
              <span className="overflow-hidden">Subreddit</span>
            </button>
          </div>
        </div>
      </nav>
      <AddSubredditDialog />
    </>
  );
}

export default Navbar;
