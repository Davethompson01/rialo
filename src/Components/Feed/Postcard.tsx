// import { useState } from "react";
// import { FaRegComment, FaHeart, FaRegHeart, FaEllipsisH } from "react-icons/fa";

// import type { FeedPost } from "../../Types/feeds";

// type Props = {
//   post: FeedPost;
//   onComment: (postId: number) => void;
// };

// const API_URL = import.meta.env.VITE_API_URL;
// const API_KEY = import.meta.env.VITE_API_KEY;

// const getHeaders = () => ({
//   "Content-Type": "application/json",
//   "x-api-key": API_KEY,
// });

// const PostCard = ({ post, onComment }: Props) => {
//   const [liked, setLiked] = useState(post.is_liked);
//   const [likes, setLikes] = useState(post.likes);
//   const [likeLoading, setLikeLoading] = useState(false);

//   const handleLike = async () => {
//     if (likeLoading) return;

//     try {
//       setLikeLoading(true);

//       console.log("LIKING POST:", post.id);

//       const response = await fetch(`${API_URL}/posts/${post.id}/like`, {
//         method: liked ? "DELETE" : "POST",
//         credentials: "include",
//         headers: getHeaders(),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Failed to update like");
//       }

//       // Update UI immediately
//       if (liked) {
//         setLikes((prev) => Math.max(0, prev - 1));
//         setLiked(false);
//       } else {
//         setLikes((prev) => prev + 1);
//         setLiked(true);
//       }
//     } catch (error) {
//       console.error("Like error:", error);
//     } finally {
//       setLikeLoading(false);
//     }
//   };

//   const initials = post.username?.slice(0, 2).toUpperCase() || "US";

//   const formattedDate = new Date(post.created_at).toLocaleDateString(
//     undefined,
//     {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     },
//   );

//   return (
//     <article className="group overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_35px_rgba(0,0,0,0.07)]">
//       {/* Accent */}
//       <div className="h-1 w-full bg-brand-dark" />

//       <div className="p-5 sm:p-6">
//         {/* Header */}
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex min-w-0 items-center gap-3">
//             {/* Avatar */}
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-white shadow-sm">
//               {initials}
//             </div>

//             {/* User */}
//             <div className="min-w-0">
//               <div className="flex items-center gap-2">
//                 <p className="truncate text-sm font-bold text-gray-950">
//                   {post.username}
//                 </p>

//                 <span className="hidden rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:inline-flex">
//                   Post
//                 </span>
//               </div>

//               <p className="mt-0.5 text-xs text-gray-400">{formattedDate}</p>
//             </div>
//           </div>

//           {/* More */}
//           <button
//             type="button"
//             className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
//           >
//             <FaEllipsisH size={13} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="mt-5">
//           {post.title && (
//             <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-950">
//               {post.title}
//             </h2>
//           )}

//           <p className="mt-3 whitespace-pre-wrap text-[14px] leading-7 text-gray-600">
//             {post.description}
//           </p>
//         </div>

//         {/* Engagement */}
//         {(likes > 0 || post.comments > 0) && (
//           <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
//             <div className="flex items-center gap-1">
//               {likes > 0 && (
//                 <>
//                   <FaHeart className="text-[10px] text-red-400" />

//                   <span>
//                     {likes} {likes === 1 ? "like" : "likes"}
//                   </span>
//                 </>
//               )}
//             </div>

//             {post.comments > 0 && (
//               <button
//                 type="button"
//                 onClick={() => onComment(post.id)}
//                 className="transition hover:text-gray-700"
//               >
//                 {post.comments} {post.comments === 1 ? "comment" : "comments"}
//               </button>
//             )}
//           </div>
//         )}

//         {/* Actions */}
//         <div className="mt-4 flex items-center border-t border-gray-100 pt-3">
//           {/* Like */}
//           <button
//             type="button"
//             onClick={handleLike}
//             disabled={likeLoading}
//             className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition ${
//               liked
//                 ? "text-red-500 hover:bg-red-50"
//                 : "text-gray-500 hover:bg-gray-50 hover:text-red-500"
//             } disabled:cursor-not-allowed disabled:opacity-50`}
//           >
//             {liked ? (
//               <FaHeart className="text-[15px]" />
//             ) : (
//               <FaRegHeart className="text-[15px]" />
//             )}

//             <span>{liked ? "Liked" : "Like"}</span>
//           </button>

//           <div className="h-6 w-px bg-gray-100" />

//           {/* Comment */}
//           <button
//             type="button"
//             onClick={() => onComment(post.id)}
//             className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-brand-dark"
//           >
//             <FaRegComment className="text-[15px]" />

//             <span>Comment</span>
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default PostCard;

import { useState } from "react";
import { FaRegComment, FaHeart, FaRegHeart, FaEllipsisH } from "react-icons/fa";

import type { FeedPost } from "../../Types/feeds";

type Props = {
  post: FeedPost;
  onComment: (postId: number) => void;
};

// Define explicit API response interfaces based on common backend paradigms
interface SuccessLikeResponse {
  success: true;
  message?: string;
  data: {
    is_liked: boolean;
    likes: number;
  };
}

interface ErrorLikeResponse {
  success: false;
  message: string;
}

type LikeApiResponse = SuccessLikeResponse | ErrorLikeResponse;

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});

const PostCard = ({ post, onComment }: Props) => {
  const [liked, setLiked] = useState(post.is_liked);
  const [likes, setLikes] = useState(post.likes);
  const [likeLoading, setLikeLoading] = useState(false);

  const handleLike = async () => {
    if (likeLoading) return;

    // Snapshot current state for rollback on error
    const previousLiked = liked;
    const previousLikes = likes;

    // 1. Optimistic Update (Immediate UI reaction)
    const nextLikedState = !liked;
    const nextLikesCount = nextLikedState ? likes + 1 : Math.max(0, likes - 1);

    setLiked(nextLikedState);
    setLikes(nextLikesCount);

    try {
      setLikeLoading(true);

      const response = await fetch(`${API_URL}/posts/${post.id}/like`, {
        method: previousLiked ? "DELETE" : "POST",
        credentials: "include",
        headers: getHeaders(),
      });

      const data: LikeApiResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          "message" in data ? data.message : "Failed to update like",
        );
      }

      // 2. Sync with source of truth if server returns exact post counts
      if (data.data) {
        setLiked(data.data.is_liked);
        setLikes(data.data.likes);
      }
    } catch (error) {
      console.error("Like error:", error);
      // Rollback to previous state on failure
      setLiked(previousLiked);
      setLikes(previousLikes);
    } finally {
      setLikeLoading(false);
    }
  };

  const initials = post.username?.slice(0, 2).toUpperCase() || "US";

  const formattedDate = new Date(post.created_at).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_35px_rgba(0,0,0,0.07)]">
      <div className="h-1 w-full bg-brand-dark" />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-white shadow-sm">
              {initials}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-bold text-gray-950">
                  {post.username}
                </p>

                <span className="hidden rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:inline-flex">
                  Post
                </span>
              </div>

              <p className="mt-0.5 text-xs text-gray-400">{formattedDate}</p>
            </div>
          </div>

          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <FaEllipsisH size={13} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5">
          {post.title && (
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-950">
              {post.title}
            </h2>
          )}

          <p className="mt-3 whitespace-pre-wrap text-[14px] leading-7 text-gray-600">
            {post.description}
          </p>
        </div>

        {/* Engagement Stats */}
        {(likes > 0 || post.comments > 0) && (
          <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1">
              {likes > 0 && (
                <>
                  <FaHeart className="text-[10px] text-red-400" />
                  <span>
                    {likes} {likes === 1 ? "like" : "likes"}
                  </span>
                </>
              )}
            </div>

            {post.comments > 0 && (
              <button
                type="button"
                onClick={() => onComment(post.id)}
                className="transition hover:text-gray-700"
              >
                {post.comments} {post.comments === 1 ? "comment" : "comments"}
              </button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex items-center border-t border-gray-100 pt-3">
          <button
            type="button"
            onClick={handleLike}
            disabled={likeLoading}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition ${
              liked
                ? "text-red-500 hover:bg-red-50"
                : "text-gray-500 hover:bg-gray-50 hover:text-red-500"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {liked ? (
              <FaHeart className="text-[15px]" />
            ) : (
              <FaRegHeart className="text-[15px]" />
            )}
            <span>{liked ? "Liked" : "Like"}</span>
          </button>

          <div className="h-6 w-px bg-gray-100" />

          <button
            type="button"
            onClick={() => onComment(post.id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-brand-dark"
          >
            <FaRegComment className="text-[15px]" />
            <span>Comment</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;