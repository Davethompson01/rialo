import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment, FaEllipsisH } from "react-icons/fa";
import type { FeedPost } from "../../Types/feeds";
import { likePost, unlikePost } from "../../Servives/Postfeeds";

type Props = {
  post: FeedPost;
  onOpenComments: (postID: number) => void;
};

const SocialPostCard = ({ post, onOpenComments }: Props) => {
  const [liked, setLiked] = useState(post.is_liked);
  const [likes, setLikes] = useState(post.likes);
  const [liking, setLiking] = useState(false);

const handleLike = async () => {
  console.log("POST OBJECT:", post);
  console.log("POST ID:", post.id);

  if (liking) return;

  try {
    setLiking(true);

    if (liked) {
      await unlikePost(post.id);

      setLiked(false);
      setLikes((prev) => Math.max(0, prev - 1));
    } else {
      await likePost(post.id);

      setLiked(true);
      setLikes((prev) => prev + 1);
    }
  } catch (error) {
    console.error("Like error:", error);
  } finally {
    setLiking(false);
  }
};

  const initials = post.username?.charAt(0).toUpperCase() || "?";

  return (
    <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      {/* Author */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold">
            {initials}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {post.username}
            </h3>

            <p className="text-xs text-gray-400">
              {new Date(post.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <button className="p-2 text-gray-400 hover:text-gray-700">
          <FaEllipsisH size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pb-5">
        <h2 className="text-lg font-bold text-gray-900">{post.title}</h2>

        <p className="mt-2 text-sm leading-6 text-gray-600 whitespace-pre-wrap">
          {post.description}
        </p>
      </div>

      {/* Stats */}
      <div className="px-5 py-3 flex items-center justify-between text-xs text-gray-400 border-t border-gray-100">
        <span>
          {likes} {likes === 1 ? "like" : "likes"}
        </span>

        <button
          onClick={() => onOpenComments(post.id)}
          className="hover:text-gray-700"
        >
          {post.comments} {post.comments === 1 ? "comment" : "comments"}
        </button>
      </div>

      {/* Actions */}
      <div className="border-t border-gray-100 px-5 py-2 flex items-center">
        <button
          disabled={liking}
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${
            liked
              ? "text-red-500"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          {liked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
          Like
        </button>

        <button
          onClick={() => onOpenComments(post.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        >
          <FaRegComment size={16} />
          Comment
        </button>
      </div>
    </article>
  );
};

export default SocialPostCard;
