type Props = {
  newMessageText: string;
  setNewMessageText: React.Dispatch<React.SetStateAction<string>>;
  handlePostMessage: (e: React.FormEvent) => void;
  loading: boolean;
};

export const NewMessageForm = ({
  newMessageText,
  setNewMessageText,
  handlePostMessage,
  loading,
}: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-black mb-4">
        Create New Message
      </h2>
      <form onSubmit={handlePostMessage} className="space-y-4">
        <textarea
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 border border-black/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
          rows={3}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !newMessageText.trim()}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-black/40 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform disabled:transform-none disabled:cursor-not-allowed"
        >
          {loading ? "Posting..." : "Post Message"}
        </button>
      </form>
    </div>
  );
};
