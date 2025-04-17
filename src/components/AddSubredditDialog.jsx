import useDialogStore from "../store/useDialogStore";

const AddSubredditDialog = () => {
  const {
    isOpen,
    subredditName,
    closeDialog,
    setSubredditName,
    resetSubredditName,
  } = useDialogStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your logic to handle the subreddit creation
    console.log("Subreddit name:", subredditName);
    resetSubredditName();
    closeDialog();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-lg p-6 w-96 shadow-xl">
        <form onSubmit={handleSubmit}>
          <fieldset className="border border-zinc-700 rounded p-4">
            <legend className="px-2 text-gray-200 font-medium">
              Enter subreddit name
            </legend>
            <input
              type="text"
              value={subredditName}
              onChange={(e) => setSubredditName(e.target.value)}
              className="w-full p-2 border border-zinc-700 rounded mt-2 bg-zinc-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={closeDialog}
                className="px-4 py-2 text-gray-200 bg-zinc-800 rounded-2xl hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-orange-500 rounded-2xl hover:bg-orange-600"
              >
                Add
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddSubredditDialog;
