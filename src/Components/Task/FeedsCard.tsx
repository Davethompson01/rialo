

import { useEffect, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import SocialPostCard from "../Feed/SocialPostCard";
import CommentsSection from "../Feed/CommentsSection";
import type { FeedPost } from "../../Types/feeds";
import { getPostFeed } from "../../Servives/Postfeeds";

const FeedsCard = () => {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [openComments, setOpenComments] = useState<number | null>(null);

const loadPosts = async (refresh = false) => {
  try {
    if (refresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    const data = await getPostFeed(1, 20);

    setPosts(data);
  } catch (error) {
    setError(error instanceof Error ? error.message : "Failed to load feed");
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};;

  useEffect(() => {
    loadPosts();
  }, []);

  const toggleComments = (postID: number) => {
    setOpenComments((current) => (current === postID ? null : postID));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-6" />

          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 bg-white border border-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Feeds</h1>

            <p className="text-sm text-gray-500 mt-1">
              See what's happening in the community.
            </p>
          </div>

          <button
            onClick={() => loadPosts(true)}
            disabled={refreshing}
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
          >
            <FaSyncAlt size={14} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 bg-white border border-red-100 rounded-xl p-4 flex items-center justify-between">
            <p className="text-sm text-red-500">{error}</p>

            <button
              onClick={() => loadPosts()}
              className="text-sm font-semibold text-gray-900"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!error && posts.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
            <h2 className="font-semibold text-gray-900">No posts yet</h2>

            <p className="text-sm text-gray-500 mt-1">
              Be the first person to share something.
            </p>
          </div>
        )}

        {/* Posts */}
        <div className="space-y-5">
          {posts.map((post) => (
            <div key={post.id}>
              <SocialPostCard post={post} onOpenComments={toggleComments} />

              {openComments === post.id && (
                <CommentsSection
                  postID={post.id}
                  onCommentCreated={() => {
                    setPosts((current) =>
                      current.map((item) =>
                        item.id === post.id
                          ? {
                              ...item,
                              comments: item.comments + 1,
                            }
                          : item,
                      ),
                    );
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FeedsCard;
