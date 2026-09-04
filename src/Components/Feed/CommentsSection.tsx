import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import type { CommentResponse } from "../../Types/feeds";
import { createComment, getPostComments } from "../../Servives/Postfeeds";
// import { FormEvent, } from "react";

type Props = {
  postID: number;
  onCommentCreated?: () => void;
};

const CommentsSection = ({ postID, onCommentCreated }: Props) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  // const [openComments, setOpenComments] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // const handleComment = (postId: number) => {
  //   setOpenComments((current) => (current === postId ? null : postId));
  // };

  const loadComments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPostComments(postID);

      setComments(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load comments",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postID]);1

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = comment.trim();

    if (!value || submitting) return;

    try {
      setSubmitting(true);

      await createComment(postID, value);

      setComment("");

      await loadComments();

      onCommentCreated?.();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
      {/* Comments */}
      {loading ? (
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      ) : error ? (
        <div className="text-sm text-red-500">{error}</div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">
          No comments yet. Be the first to comment.
        </p>
      ) : (
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {comments.map((item) => (
            <div key={item.comment_id} className="flex gap-3">
              <div className="w-8 h-8 shrink-0 rounded-full bg-brand-dark text-white flex items-center justify-center text-xs font-bold">
                {item.username?.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <div className="bg-white rounded-xl px-3 py-2 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-900">
                    {item.username}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">{item.comment}</p>
                </div>

                <p className="text-[11px] text-gray-400 mt-1 ml-2">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add comment */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
        />

        <button
          type="submit"
          disabled={!comment.trim() || submitting}
          className="w-10 h-10 shrink-0 rounded-xl bg-brand-dark text-white flex items-center justify-center disabled:opacity-40"
        >
          <FaPaperPlane size={13} />
        </button>
      </form>
    </div>
  );
};

export default CommentsSection;
