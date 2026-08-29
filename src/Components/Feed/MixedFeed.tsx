// import { useEffect, useState } from "react";
// import { FaPlus, FaSyncAlt } from "react-icons/fa";

// import { getDashboardFeed } from "../../Servives/Feeds";
// import type { DashboardFeedItem } from "../../Types/feeds";

// import PostCard from "./Postcard";
// import TaskCard from "./TaskCard";
// import CommentsSection from "./CommentsSection";

// const API_KEY = import.meta.env.VITE_API_KEY;

// const getHeaders = () => ({
//   "Content-Type": "application/json",
//   "x-api-key": API_KEY,
// });

// const MixedFeed = () => {
//   const [openComments, setOpenComments] = useState<number | null>(null);
//   const [feed, setFeed] = useState<DashboardFeedItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadFeed = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const data = await getDashboardFeed();

//       setFeed(data);
//     } catch (error) {
//       console.error(error);

//       setError(error instanceof Error ? error.message : "Failed to load feed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadFeed();
//   }, []);

//   const handleComment = (postId: number) => {
//     setOpenComments((current) => (current === postId ? null : postId));
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Comment created
//   |--------------------------------------------------------------------------
//   */

//   const handleCommentCreated = (postId: number) => {
//     setFeed((current) =>
//       current.map((item) => {
//         if (item.type !== "post") {
//           return item;
//         }

//         if (item.id !== postId) {
//           return item;
//         }

//         return {
//           ...item,
//           comments: item.comments + 1,
//         };
//       }),
//     );
//   };

//   const handleApply = async (taskId: number) => {
//     try {
//       const API_URL = import.meta.env.VITE_API_URL;

//       const response = await fetch(`${API_URL}/task/apply`, {
//         method: "POST",
//         credentials: "include",
//         headers: getHeaders(),
//         body: JSON.stringify({
//           Task_id: taskId,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Failed to apply for task");
//       }

//       await loadFeed();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   /* ---------------- LOADING ---------------- */

//   if (loading) {
//     return (
//       <div className="space-y-5">
//         {[1, 2, 3].map((item) => (
//           <div
//             key={item}
//             className="overflow-hidden rounded-3xl border border-gray-200 bg-white"
//           >
//             <div className="h-1 bg-gray-200" />

//             <div className="animate-pulse p-6">
//               <div className="flex items-center gap-3">
//                 <div className="h-11 w-11 rounded-full bg-gray-200" />

//                 <div className="space-y-2">
//                   <div className="h-3 w-28 rounded bg-gray-200" />
//                   <div className="h-2 w-20 rounded bg-gray-100" />
//                 </div>
//               </div>

//               <div className="mt-6 space-y-3">
//                 <div className="h-5 w-2/3 rounded bg-gray-200" />
//                 <div className="h-3 w-full rounded bg-gray-100" />
//                 <div className="h-3 w-5/6 rounded bg-gray-100" />
//                 <div className="h-3 w-4/6 rounded bg-gray-100" />
//               </div>

//               <div className="mt-6 border-t border-gray-100 pt-4">
//                 <div className="h-9 rounded-xl bg-gray-100" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   /* ---------------- ERROR ---------------- */

//   if (error) {
//     return (
//       <div className="rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">
//         <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
//           !
//         </div>

//         <h3 className="mt-4 font-semibold text-gray-900">
//           Something went wrong
//         </h3>

//         <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">{error}</p>

//         <button
//           onClick={loadFeed}
//           className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
//         >
//           <FaSyncAlt size={12} />
//           Try again
//         </button>
//       </div>
//     );
//   }

//   /* ---------------- EMPTY ---------------- */

//   if (feed.length === 0) {
//     return (
//       <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">
//         <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
//           <FaPlus className="text-gray-500" />
//         </div>

//         <h3 className="mt-5 text-lg font-bold text-gray-900">
//           Your feed is empty
//         </h3>

//         <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
//           Community posts and available tasks will appear here.
//         </p>
//       </div>
//     );
//   }

//   /* ---------------- FEED ---------------- */

//   return (
//     <section className="w-full">
//       {/* Feed heading */}
//       <div className="mb-5 flex items-end justify-between">
//         <div>
//           <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
//             Community
//           </p>

//           <h1 className="mt-1 text-2xl font-black tracking-tight text-gray-950">
//             Latest activity
//           </h1>
//         </div>

//         <button
//           type="button"
//           onClick={loadFeed}
//           disabled={loading}
//           className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
//           title="Refresh feed"
//         >
//           <FaSyncAlt size={12} className={loading ? "animate-spin" : ""} />
//         </button>
//       </div>

//       {/* Timeline */}
//       <div className="relative">
//         {/* subtle timeline line */}
//         <div className="absolute bottom-0 left-[20px] top-0 hidden w-px bg-gray-200 sm:block" />

//         <div className="relative space-y-6">
//           {feed.map((item) => {
//             if (item.type === "post") {
//               return (
//                 <div key={`post-${item.id}`} className="relative sm:pl-10">
//                   {/* timeline dot */}
//                   <div className="absolute left-[14px] top-7 hidden h-3 w-3 rounded-full border-2 border-white bg-brand-dark shadow sm:block" />

//                   <PostCard post={item} onComment={handleComment} />
//                   {openComments === item.id && (
//                     <div className="mt-2">
//                       <CommentsSection
//                         postID={item.id}
//                         onCommentCreated={() => handleCommentCreated(item.id)}
//                       />
//                     </div>
//                   )}
//                 </div>
//               );
//             }

//             if (item.type === "task") {
//               return (
//                 <div key={`task-${item.id}`} className="relative sm:pl-10">
//                   {/* timeline dot */}
//                   <div className="absolute left-[14px] top-7 hidden h-3 w-3 rounded-full border-2 border-white bg-gray-400 shadow sm:block" />

//                   <TaskCard task={item} />
//                   {/* <TaskCard task={item} onApply={handleApply} /> */}
//                   {/* <TaskCard task={item} onApply={handleApply} /> */}
//                 </div>
//               );
//             }

//             return null;
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MixedFeed;

import { useEffect, useState } from "react";
import { FaPlus, FaSyncAlt, FaLayerGroup } from "react-icons/fa";

import { getDashboardFeed } from "../../Servives/Feeds";
import type { DashboardFeedItem } from "../../Types/feeds";

import PostCard from "./Postcard";
import TaskCard from "./TaskCard";
import CommentsSection from "./CommentsSection";

// const API_KEY = import.meta.env.VITE_API_KEY;

// const getHeaders = () => ({
//   "Content-Type": "application/json",
//   "x-api-key": API_KEY,
// });

const MixedFeed = () => {
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [feed, setFeed] = useState<DashboardFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFeed = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getDashboardFeed();
      setFeed(data);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const handleComment = (postId: number) => {
    setOpenComments((current) => (current === postId ? null : postId));
  };

  const handleCommentCreated = (postId: number) => {
    setFeed((current) =>
      current.map((item) => {
        if (item.type !== "post" || item.id !== postId) return item;
        return { ...item, comments: item.comments + 1 };
      }),
    );
  };

  /* ---------------- LOADING SKELETON ---------------- */
  if (loading) {
    return (
      <div className="space-y-6 p-1">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 backdrop-blur-md shadow-sm"
          >
            <div className="h-1 w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse" />
            <div className="animate-pulse p-6">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-slate-200" />
                <div className="space-y-2">
                  <div className="h-3 w-28 rounded bg-slate-200" />
                  <div className="h-2 w-20 rounded bg-slate-100" />
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-5 w-2/3 rounded bg-slate-200" />
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-5/6 rounded bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ---------------- ERROR STATE ---------------- */
  if (error) {
    return (
      <div className="rounded-3xl border border-rose-200/80 bg-rose-50/50 p-10 text-center shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 font-bold shadow-inner">
          !
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-900">
          Something went wrong
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">{error}</p>
        <button
          onClick={loadFeed}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 hover:shadow-lg active:scale-95"
        >
          <FaSyncAlt size={12} />
          Try again
        </button>
      </div>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */
  if (feed.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60">
          <FaPlus className="text-slate-400" />
        </div>
        <h3 className="mt-5 text-lg font-bold text-slate-900">
          Your feed is empty
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Community posts and available tasks will appear here.
        </p>
      </div>
    );
  }

  /* ---------------- MAIN FEED ---------------- */
  return (
    <section className="w-full rounded-3xl bg-slate-50/60 p-4 sm:p-6 backdrop-blur-xl border border-slate-200/60 shadow-xs">
      {/* Feed Heading */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-200/80 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
            <FaLayerGroup size={10} /> Community
          </span>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
            Latest Activity
          </h1>
        </div>

        <button
          type="button"
          onClick={loadFeed}
          disabled={loading}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 active:scale-95 disabled:opacity-50"
          title="Refresh feed"
        >
          <FaSyncAlt size={13} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute bottom-0 left-[19px] top-4 hidden w-[2px] bg-gradient-to-b from-slate-200 via-slate-300 to-transparent sm:block" />

        <div className="relative space-y-6">
          {feed.map((item) => {
            if (item.type === "post") {
              return (
                <div
                  key={`post-${item.id}`}
                  className="relative group sm:pl-10"
                >
                  {/* Timeline Dot - Active Gradient */}
                  <div className="absolute left-[13px] top-6 hidden h-3.5 w-3.5 rounded-full border-2 border-white bg-slate-900 ring-2 ring-slate-100 transition group-hover:scale-125 sm:block" />

                  <div className="rounded-2xl bg-white/90 border border-slate-200/70 shadow-xs transition duration-200 hover:border-slate-300 hover:shadow-md">
                    <PostCard post={item} onComment={handleComment} />
                  </div>

                  {openComments === item.id && (
                    <div className="mt-3 rounded-2xl border border-slate-200/80 bg-slate-100/60 p-4 backdrop-blur-xs">
                      <CommentsSection
                        postID={item.id}
                        onCommentCreated={() => handleCommentCreated(item.id)}
                      />
                    </div>
                  )}
                </div>
              );
            }

            if (item.type === "task") {
              return (
                <div
                  key={`task-${item.id}`}
                  className="relative group sm:pl-10"
                >
                  {/* Timeline Dot - Task Accent */}
                  <div className="absolute left-[13px] top-6 hidden h-3.5 w-3.5 rounded-full border-2 border-white bg-amber-500 ring-2 ring-amber-100 transition group-hover:scale-125 sm:block" />

                  <div className="rounded-2xl bg-gradient-to-br from-amber-50/40 via-white to-white border border-amber-200/60 shadow-xs transition duration-200 hover:border-amber-300 hover:shadow-md">
                    <TaskCard task={item} />
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </section>
  );
};

export default MixedFeed;