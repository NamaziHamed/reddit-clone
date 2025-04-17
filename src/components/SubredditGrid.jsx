import React, { useEffect, useState } from "react";
import useSubredditStore from "../store/useSubredditStore";
import { FaArrowUp, FaRedditAlien } from "react-icons/fa6";

const SubredditGrid = () => {
  const subreddits = useSubredditStore((state) => state.subreddits);
  const [posts, setPosts] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [postsLimit, setPostsLimit] = useState(3);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        // md breakpoint
        setPostsLimit(6);
      } else {
        setPostsLimit(3);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = {};
      for (const subreddit of subreddits) {
        try {
          const response = await fetch(
            `https://www.reddit.com/r/${subreddit.name}/hot.json?limit=${postsLimit}`
          );
          const data = await response.json();
          postsData[subreddit.id] = data.data.children.map((post) => ({
            id: post.data.id,
            title: post.data.title,
            image: post.data.thumbnail,
            upvotes: post.data.ups,
            url: `https://www.reddit.com${post.data.permalink}`,
          }));
        } catch (error) {
          console.error(`Error fetching posts for r/${subreddit.name}:`, error);
          postsData[subreddit.id] = [];
        }
      }
      setPosts(postsData);
    };

    fetchPosts();
  }, [subreddits, postsLimit]);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  const handleImageError = (postId) => {
    setImageErrors((prev) => ({
      ...prev,
      [postId]: true,
    }));
  };

  return (
    <div className="ml-16 md:ml-48 lg:ml-64 p-4">
      {subreddits.map((subreddit) => (
        <div key={subreddit.id} className="mb-8">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">
            r/{subreddit.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts[subreddit.id]?.slice(0, postsLimit).map((post) => (
              <div
                key={post.id}
                className="bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800 transition-colors cursor-pointer h-full"
                onClick={() => handleCardClick(post.url)}
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="w-full md:w-32 flex-shrink-0">
                    {post.image &&
                    post.image !== "self" &&
                    !imageErrors[post.id] ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-32 object-cover"
                        onError={() => handleImageError(post.id)}
                      />
                    ) : (
                      <div className="w-full h-32 bg-zinc-800 flex items-center justify-center">
                        <FaRedditAlien className="w-12 h-12 md:w-16 md:h-16 text-orange-500" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-4 flex-1 flex flex-col">
                    <h3 className="text-gray-200 font-medium mb-2 flex-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 mt-2">
                      <FaArrowUp className="text-orange-500" />
                      <span>{post.upvotes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubredditGrid;
