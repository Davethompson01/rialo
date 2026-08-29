import { useState } from "react";
import { CiSignpostDuo1 } from "react-icons/ci";
import { FiImage, FiSmile, FiPaperclip } from "react-icons/fi";
import Modal from "./PostButton";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const PostSocialFeed = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const getHeaders = () => ({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  });

  const resetForm = () => {
    setContent("");
    setError("");
  };

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const description = content.trim();

    if (!description) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/posts/create`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
        body: JSON.stringify({
          title: "Community Post",
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create post");
      }

      resetForm();
      setOpen(false);

      console.log("Post created:", data.data);
    } catch (error) {
      console.error("Create post error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to create post",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Post button */}
      <button
        onClick={() => {
          setError("");
          setOpen(true);
        }}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-gray-50 hover:shadow active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-black/10 sm:w-auto"
      >
        <CiSignpostDuo1 className="h-4 w-4 text-gray-600 transition-transform duration-200 group-hover:scale-110 group-hover:text-black" />

        <span>Post</span>
      </button>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => {
          if (!loading) {
            setOpen(false);
            resetForm();
          }
        }}
        title="Create Post"
        subtitle="Share updates, ideas, or announcements with your community."
      >
        <form className="space-y-4" onSubmit={handleCreatePost}>
          <div className="relative">
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              disabled={loading}
              className="w-full resize-none rounded-xl border border-gray-200 p-4 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5 disabled:bg-gray-50"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Media & Quick Attach Bar */}
          <div className="flex items-center justify-between border-b border-t border-gray-100 py-2.5 px-1">
            <span className="text-xs font-medium text-gray-400">
              Add to post
            </span>

            <div className="flex items-center gap-1 text-gray-500">
              <button
                type="button"
                disabled={loading}
                className="rounded-lg p-2 transition hover:bg-gray-100 hover:text-black disabled:opacity-40"
                title="Attach Image"
              >
                <FiImage className="h-4 w-4" />
              </button>

              <button
                type="button"
                disabled={loading}
                className="rounded-lg p-2 transition hover:bg-gray-100 hover:text-black disabled:opacity-40"
                title="Attach File"
              >
                <FiPaperclip className="h-4 w-4" />
              </button>

              <button
                type="button"
                disabled={loading}
                className="rounded-lg p-2 transition hover:bg-gray-100 hover:text-black disabled:opacity-40"
                title="Add Emoji"
              >
                <FiSmile className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
              className="w-full rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!content.trim() || loading}
              className="w-full rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PostSocialFeed;
