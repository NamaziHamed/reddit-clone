import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSubredditStore = create(
  persist(
    (set) => ({
      subreddits: [],
      addSubreddit: async (name) => {
        try {
          // Validate input
          if (!name || name.trim().length === 0) {
            throw new Error("Please enter a subreddit name");
          }

          // Clean the name (remove r/ prefix if present and trim)
          const cleanName = name.replace(/^r\//, "").trim();

          const response = await fetch(
            `https://www.reddit.com/r/${cleanName}/about.json`
          );
          const data = await response.json();

          // Check if subreddit exists
          if (response.status === 404 || data.error === 404) {
            throw new Error("Subreddit not found");
          }

          // Check if subreddit is private or restricted
          if (
            data.data.over18 ||
            data.data.restricted ||
            data.data.quarantine
          ) {
            throw new Error(
              "This subreddit is private, restricted, or quarantined"
            );
          }

          // Check if we already have this subreddit
          const existingSubreddit = useSubredditStore
            .getState()
            .subreddits.find(
              (sub) => sub.name.toLowerCase() === cleanName.toLowerCase()
            );
          if (existingSubreddit) {
            throw new Error("This subreddit is already added");
          }

          const subredditData = {
            id: data.data.id,
            name: data.data.display_name,
            title: data.data.title,
            description: data.data.public_description,
            subscribers: data.data.subscribers,
            icon: data.data.icon_img || data.data.community_icon || null,
          };

          set((state) => ({
            subreddits: [...state.subreddits, subredditData],
          }));
          return { success: true };
        } catch (error) {
          console.error("Error fetching subreddit:", error);
          return {
            success: false,
            error:
              error.message || "An error occurred while adding the subreddit",
          };
        }
      },
      removeSubreddit: (id) => {
        set((state) => ({
          subreddits: state.subreddits.filter((sub) => sub.id !== id),
        }));
      },
      fetchInitialSubreddits: async () => {
        try {
          // For r/all, we'll create a default entry since it's a special case
          const allSubreddit = {
            id: "all",
            name: "all",
            title: "All Subreddits",
            description: "The most active posts from all of Reddit",
            subscribers: 0, // r/all doesn't have subscribers
            icon: null,
          };

          // Only add r/all if it's not already in the list
          set((state) => {
            if (!state.subreddits.some((sub) => sub.id === "all")) {
              return { subreddits: [allSubreddit, ...state.subreddits] };
            }
            return state;
          });
        } catch (error) {
          console.error("Error setting initial subreddits:", error);
        }
      },
    }),
    {
      name: "subreddit-storage", // unique name for the storage
      getStorage: () => localStorage, // use localStorage as the storage
    }
  )
);

export default useSubredditStore;
