import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import type { Message } from "~/types/message";
import type { AppContextType } from "~/root";
import { NewMessageForm } from "~/components/messages/NewMessageForm";
import { MessageList } from "~/components/messages/MessageList";

export default function Messages() {
  const { messageService, authService } = useOutletContext<AppContextType>();

  const navigator = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await messageService.getMessages("");
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handlePostMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    try {
      setLoading(true);
      setError(null);
      await messageService.postMessage(newMessageText);
      setNewMessageText("");
      await fetchMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post message");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMessage = async (id: string) => {
    if (!editText.trim()) return;

    try {
      setLoading(true);
      setError(null);
      await messageService.updateMessage(id, editText);
      setEditingId(null);
      setEditText("");
      await fetchMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update message");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      setLoading(true);
      setError(null);
      await messageService.deleteMessage(id);
      await fetchMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete message");
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (message: Message) => {
    setEditingId(message.id);
    setEditText(message.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-stone-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => {
              authService.signout();
              navigator("/");
            }}
            className="inline-flex items-center text-orange-600 hover:text-orange-600 mb-4 font-semibold transition duration-200"
          >
            Sign out
          </button>
          <h1 className="text-4xl font-bold text-black mb-2">Messages</h1>
          <p className="text-black/50">
            Share your thoughts with the community
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <NewMessageForm
          newMessageText={newMessageText}
          setNewMessageText={setNewMessageText}
          handlePostMessage={handlePostMessage}
          loading={loading}
        />

        {loading && messages.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-black/50">Loading messages...</p>
          </div>
        )}

        <MessageList
          messages={messages}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          startEditing={startEditing}
          cancelEditing={cancelEditing}
          handleUpdateMessage={handleUpdateMessage}
          handleDeleteMessage={handleDeleteMessage}
          loading={loading}
        />

        {!loading && messages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <span className="text-4xl">✏️</span>
            <h3 className="mt-4 text-lg font-medium text-black">
              No messages yet
            </h3>
            <p className="mt-2 text-black/50">
              Be the first to share a message!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
