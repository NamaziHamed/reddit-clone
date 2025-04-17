import React, { useState } from "react";
import { FaPlus, FaRedditAlien } from "react-icons/fa6";
import useDialogStore from "../store/useDialogStore";
import useSubredditStore from "../store/useSubredditStore";
import AddSubredditDialog from "./AddSubredditDialog";

function Navbar() {
  const openDialog = useDialogStore((state) => state.openDialog);
  const subreddits = useSubredditStore((state) => state.subreddits);

  const SubredditIcon = ({ subreddit }) => {
    const [imageError, setImageError] = useState(false);

    if (subreddit.icon && !imageError) {
      return (
        <img
          src={subreddit.icon}
          alt={subreddit.name}
          className="w-8 h-8 rounded-full"
          onError={() => setImageError(true)}
        />
      );
    }

    return (
      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold px-1">
        {subreddit.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 min-h-screen w-16 md:w-48 lg:w-64 px-2 md:px-4 
    py-2 bg-zinc-900 z-50 transition-all duration-300"
      >
        <div className="flex flex-col gap-3 items-center">
          <div className="flex items-center gap-2">
            <FaRedditAlien className="w-8 h-8 text-orange-500" />
            <span className="text-lg md:text-2xl lg:text-3xl font-bold hidden md:block">
              Reddit Clone
            </span>
          </div>
          <div className="w-full mt-4 space-y-2">
            {subreddits.map((subreddit) => (
              <div
                key={subreddit.id}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800 cursor-pointer"
              >
                <SubredditIcon subreddit={subreddit} />
                <div className="md:flex flex-col hidden">
                  <span className="text-gray-200 font-medium">
                    r/{subreddit.name}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {subreddit.subscribers.toLocaleString()} members
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-10">
            <button
              onClick={openDialog}
              className="bg-orange-500 rounded-full p-2 md:px-4 md:py-2 
              flex items-center gap-1 lg:text-lg hover:bg-orange-600 transition-colors"
            >
              <FaPlus className="inline" />
              <span className="hidden md:inline">Add</span>
              <span className="hidden lg:inline">Subreddit</span>
            </button>
          </div>
        </div>
      </nav>
      <AddSubredditDialog />
    </>
  );
}

export default Navbar;
