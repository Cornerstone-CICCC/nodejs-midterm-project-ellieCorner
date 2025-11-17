import type { Message } from "~/types/message";
import { getProfileUrl, generateDefaultAvatar } from "~/utils/avatar";

type Props = {
  messages: Message[];
  editingId: string | null;
  editText: string;
  setEditText: (text: string) => void;
  loading: boolean;
  handleUpdateMessage: (id: string) => void;
  cancelEditing: () => void;
  startEditing: (message: Message) => void;
  handleDeleteMessage: (id: string) => void;
};

export const MessageList = ({
  messages,
  editingId,
  editText,
  setEditText,
  loading,
  handleUpdateMessage,
  cancelEditing,
  startEditing,
  handleDeleteMessage,
}: Props) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <img
                src={getProfileUrl(message.url, message.name)}
                alt={message.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e) => {
                  e.currentTarget.src = generateDefaultAvatar(message.name);
                }}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-black">{message.name}</h3>
                <p className="text-sm text-black/50">@{message.username}</p>
              </div>
              <span className="text-sm text-black/50">
                {new Date(message.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {editingId === message.id ? (
              <div className="space-y-3">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full px-4 py-3 border border-black/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={3}
                  disabled={loading}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateMessage(message.id)}
                    disabled={loading || !editText.trim()}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-black/40 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:cursor-not-allowed"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    disabled={loading}
                    className="flex-1 bg-black/30 hover:bg-black disabled:bg-black/40 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-black/70 mb-4 whitespace-pre-wrap">
                  {message.text}
                </p>

                <div className="flex gap-2 pt-4 border-t border-black/10">
                  <button
                    onClick={() => startEditing(message)}
                    disabled={loading}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-orange-600 font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMessage(message.id)}
                    disabled={loading}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
