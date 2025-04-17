import React, { useState } from "react";
import { FaRedditAlien, FaArrowUp, FaArrowDown } from "react-icons/fa6";

const SubredditCard = ({ subreddit }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800 transition-colors cursor-pointer">
      <div className="flex items-start gap-3">
        {/* Subreddit Icon */}
        <div className="flex-shrink-0">
          {subreddit.icon && !imageError ? (
            <img
              src={subreddit.icon}
              alt={subreddit.name}
              className="w-10 h-10 rounded-full"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <FaRedditAlien className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-gray-200 font-medium">
              r/{subreddit.name}
            </span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">
              {subreddit.subscribers.toLocaleString()} members
            </span>
          </div>
          <h3 className="text-gray-200 font-semibold mt-1 line-clamp-2">
            {subreddit.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
            {subreddit.description}
          </p>
        </div>

        {/* Upvote/Downvote */}
        <div className="flex flex-col items-center gap-1">
          <button className="text-gray-400 hover:text-orange-500 transition-colors">
            <FaArrowUp className="w-5 h-5" />
          </button>
          <span className="text-gray-200 font-medium">0</span>
          <button className="text-gray-400 hover:text-blue-500 transition-colors">
            <FaArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubredditCard;
