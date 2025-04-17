import { useEffect } from "react";
import Navbar from "./components/navbar";
import useSubredditStore from "./store/useSubredditStore";

function App() {
  const fetchInitialSubreddits = useSubredditStore((state) => state.fetchInitialSubreddits);

  useEffect(() => {
    fetchInitialSubreddits();
  }, [fetchInitialSubreddits]);

  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
