import { useEffect } from "react";
import Navbar from "./components/navbar";
import SubredditGrid from "./components/SubredditGrid";
import useSubredditStore from "./store/useSubredditStore";

function App() {
  const fetchInitialSubreddits = useSubredditStore((state) => state.fetchInitialSubreddits);

  useEffect(() => {
    fetchInitialSubreddits();
  }, [fetchInitialSubreddits]);

  return (
    <>
      <Navbar />
      <SubredditGrid />
    </>
  );
}

export default App;
