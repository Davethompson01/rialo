// import { useEffect, useState } from "react";
// import { FaPlus, FaSyncAlt, FaLayerGroup } from "react-icons/fa";

// import { getDashboardFeed } from "../../Servives/Feeds";
// import type { DashboardFeedItem } from "../../Types/feeds";

// import PostCard from "./Postcard";
// import TaskCard from "./TaskCard";
// import CommentsSection from "./CommentsSection";

// // const API_KEY = import.meta.env.VITE_API_KEY;

// // const getHeaders = () => ({
// //   "Content-Type": "application/json",
// //   "x-api-key": API_KEY,
// // });

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

//   const handleCommentCreated = (postId: number) => {
//     setFeed((current) =>
//       current.map((item) => {
//         if (item.type !== "post" || item.id !== postId) return item;
//         return { ...item, comments: item.comments + 1 };
//       }),
//     );
//   };

//   /* ---------------- LOADING SKELETON ---------------- */
//   if (loading) {
//     return (
//       <div className="space-y-6 p-1">
//         {[1, 2, 3].map((item) => (
//           <div
//             key={item}
//             className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 backdrop-blur-md shadow-sm"
//           >
//             <div className="h-1 w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse" />
//             <div className="animate-pulse p-6">
//               <div className="flex items-center gap-3">
//                 <div className="h-11 w-11 rounded-full bg-slate-200" />
//                 <div className="space-y-2">
//                   <div className="h-3 w-28 rounded bg-slate-200" />
//                   <div className="h-2 w-20 rounded bg-slate-100" />
//                 </div>
//               </div>
//               <div className="mt-6 space-y-3">
//                 <div className="h-5 w-2/3 rounded bg-slate-200" />
//                 <div className="h-3 w-full rounded bg-slate-100" />
//                 <div className="h-3 w-5/6 rounded bg-slate-100" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   /* ---------------- ERROR STATE ---------------- */
//   if (error) {
//     return (
//       <div className="rounded-3xl border border-rose-200/80 bg-rose-50/50 p-10 text-center shadow-sm backdrop-blur-sm">
//         <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 font-bold shadow-inner">
//           !
//         </div>
//         <h3 className="mt-4 text-base font-bold text-slate-900">
//           Something went wrong
//         </h3>
//         <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">{error}</p>
//         <button
//           onClick={loadFeed}
//           className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 hover:shadow-lg active:scale-95"
//         >
//           <FaSyncAlt size={12} />
//           Try again
//         </button>
//       </div>
//     );
//   }

//   /* ---------------- EMPTY STATE ---------------- */
//   if (feed.length === 0) {
//     return (
//       <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center backdrop-blur-sm">
//         <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60">
//           <FaPlus className="text-slate-400" />
//         </div>
//         <h3 className="mt-5 text-lg font-bold text-slate-900">
//           Your feed is empty
//         </h3>
//         <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
//           Community posts and available tasks will appear here.
//         </p>
//       </div>
//     );
//   }

//   /* ---------------- MAIN FEED ---------------- */
//   return (
//     <section className="w-full rounded-3xl bg-slate-50/60 p-4 sm:p-6 backdrop-blur-xl border border-slate-200/60 shadow-xs">
//       {/* Feed Heading */}
//       <div className="mb-6 flex items-center justify-between border-b border-slate-200/80 pb-4">
//         <div>
//           <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
//             <FaLayerGroup size={10} /> Community
//           </span>
//           <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
//             Latest Activity
//           </h1>
//         </div>

//         <button
//           type="button"
//           onClick={loadFeed}
//           disabled={loading}
//           className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 active:scale-95 disabled:opacity-50"
//           title="Refresh feed"
//         >
//           <FaSyncAlt size={13} className={loading ? "animate-spin" : ""} />
//         </button>
//       </div>

//       {/* Timeline Container */}
//       <div className="relative">
//         {/* Timeline Line */}
//         <div className="absolute bottom-0 left-[19px] top-4 hidden w-[2px] bg-gradient-to-b from-slate-200 via-slate-300 to-transparent sm:block" />

//         <div className="relative space-y-6">
//           {feed.map((item) => {
//             if (item.type === "post") {
//               return (
//                 <div
//                   key={`post-${item.id}`}
//                   className="relative group sm:pl-10"
//                 >
//                   {/* Timeline Dot - Active Gradient */}
//                   <div className="absolute left-[13px] top-6 hidden h-3.5 w-3.5 rounded-full border-2 border-white bg-slate-900 ring-2 ring-slate-100 transition group-hover:scale-125 sm:block" />

//                   <div className="rounded-2xl bg-white/90 border border-slate-200/70 shadow-xs transition duration-200 hover:border-slate-300 hover:shadow-md">
//                     <PostCard post={item} onComment={handleComment} />
//                   </div>

//                   {openComments === item.id && (
//                     <div className="mt-3 rounded-2xl border border-slate-200/80 bg-slate-100/60 p-4 backdrop-blur-xs">
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
//                 <div
//                   key={`task-${item.id}`}
//                   className="relative group sm:pl-10"
//                 >
//                   {/* Timeline Dot - Task Accent */}
//                   <div className="absolute left-[13px] top-6 hidden h-3.5 w-3.5 rounded-full border-2 border-white bg-amber-500 ring-2 ring-amber-100 transition group-hover:scale-125 sm:block" />

//                   <div className="rounded-2xl bg-gradient-to-br from-amber-50/40 via-white to-white border border-amber-200/60 shadow-xs transition duration-200 hover:border-amber-300 hover:shadow-md">
//                     <TaskCard task={item} />
//                   </div>
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

import { useEffect, useMemo, useState } from "react";
import {
  FaPlus,
  FaSyncAlt,
  FaLayerGroup,
  FaTasks,
  FaComments,
  FaFire,
} from "react-icons/fa";

import { getDashboardFeed } from "../../Servives/Feeds";
import type { DashboardFeedItem } from "../../Types/feeds";

import PostCard from "./Postcard";
import TaskCard from "./TaskCard";
import CommentsSection from "./CommentsSection";

type FeedFilter = "all" | "tasks" | "posts";

const MixedFeed = () => {
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [feed, setFeed] = useState<DashboardFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FeedFilter>("all");

  const loadFeed = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const data = await getDashboardFeed();
      setFeed(data);
    } catch (error) {
      console.error(error);

      setError(error instanceof Error ? error.message : "Failed to load feed");
    } finally {
      setLoading(false);
      setRefreshing(false);
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
        if (item.type !== "post" || item.id !== postId) {
          return item;
        }

        return {
          ...item,
          comments: item.comments + 1,
        };
      }),
    );
  };

  const filteredFeed = useMemo(() => {
    if (filter === "all") {
      return feed;
    }

    return feed.filter((item) => item.type === filter.slice(0, -1));
  }, [feed, filter]);

  const taskCount = feed.filter((item) => item.type === "task").length;
  const postCount = feed.filter((item) => item.type === "post").length;

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Header skeleton */}
        <div className="animate-pulse">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="mt-3 h-8 w-52 rounded bg-slate-200" />
        </div>

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="animate-pulse p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200" />

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

  /* ---------------- ERROR ---------------- */

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-sm font-black text-red-600">
          !
        </div>

        <h3 className="mt-4 font-bold text-slate-900">
          Couldn't load your feed
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          {error}
        </p>

        <button
          onClick={() => loadFeed()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-95"
        >
          <FaSyncAlt size={12} />
          Try again
        </button>
      </div>
    );
  }

  /* ---------------- EMPTY ---------------- */

  if (feed.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <FaLayerGroup className="text-slate-400" />
        </div>

        <h3 className="mt-5 text-lg font-black text-slate-900">
          Nothing here yet
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          New community posts and available tasks will show up here.
        </p>

        <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800">
          <FaPlus size={11} />
          Create something
        </button>
      </div>
    );
  }

  /* ---------------- MAIN FEED ---------------- */

  return (
    <section className="w-full">
      {/* HEADER */}
      <div className="mb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100">
                <FaFire size={10} />
              </span>
              Your hub
            </div>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Latest activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Discover what's happening around the community.
            </p>
          </div>

          {/* REFRESH */}
          <button
            type="button"
            onClick={() => loadFeed(true)}
            disabled={refreshing}
            title="Refresh feed"
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaSyncAlt
              size={12}
              className={
                refreshing
                  ? "animate-spin"
                  : "transition-transform group-hover:rotate-45"
              }
            />
          </button>
        </div>

        {/* FILTER BAR */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="flex w-fit items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
              icon={<FaLayerGroup size={10} />}
              label="All"
              count={feed.length}
            />

            <FilterButton
              active={filter === "tasks"}
              onClick={() => setFilter("tasks")}
              icon={<FaTasks size={10} />}
              label="Tasks"
              count={taskCount}
            />

            <FilterButton
              active={filter === "posts"}
              onClick={() => setFilter("posts")}
              icon={<FaComments size={10} />}
              label="Posts"
              count={postCount}
            />
          </div>

          <span className="hidden text-xs font-medium text-slate-400 sm:block">
            {filteredFeed.length} {filteredFeed.length === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      {/* FEED */}
      <div className="relative">
        {/* Timeline */}
        <div className="absolute bottom-4 left-[19px] top-5 hidden w-px bg-slate-200 sm:block" />

        <div className="space-y-4">
          {filteredFeed.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-300 shadow-sm">
                {filter === "tasks" ? (
                  <FaTasks size={15} />
                ) : (
                  <FaComments size={15} />
                )}
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-700">
                No {filter} yet
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Check back later for new activity.
              </p>
            </div>
          ) : (
            filteredFeed.map((item) => {
              /* -------- POST -------- */

              if (item.type === "post") {
                return (
                  <div
                    key={`post-${item.id}`}
                    className="group relative sm:pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[13px] top-7 hidden h-3.5 w-3.5 rounded-full border-[3px] border-slate-50 bg-slate-950 transition-transform group-hover:scale-125 sm:block" />

                    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-slate-300 hover:shadow-md">
                      <PostCard post={item} onComment={handleComment} />
                    </article>

                    {openComments === item.id && (
                      <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <CommentsSection
                          postID={item.id}
                          onCommentCreated={() => handleCommentCreated(item.id)}
                        />
                      </div>
                    )}
                  </div>
                );
              }

              /* -------- TASK -------- */

              if (item.type === "task") {
                return (
                  <div
                    key={`task-${item.id}`}
                    className="group relative sm:pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[11px] top-7 hidden h-[17px] w-[17px] items-center justify-center rounded-full border-[3px] border-slate-50 bg-black sm:flex">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e8e3d5]" />
                    </div>

                    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-slate-300 hover:shadow-md">
                      {/* TASK LABEL */}
                      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-950 text-white">
                            <FaTasks size={9} />
                          </span>

                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                            New opportunity
                          </span>
                        </div>

                        <span className="text-[10px] font-medium text-slate-400">
                          Task
                        </span>
                      </div>

                      <TaskCard task={item} />
                    </article>
                  </div>
                );
              }

              return null;
            })
          )}
        </div>
      </div>
    </section>
  );
};

/* ---------------- FILTER BUTTON ---------------- */

const FilterButton = ({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
        active
          ? "bg-slate-950 text-white shadow-sm"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {icon}

      <span>{label}</span>

      <span
        className={`rounded-md px-1.5 py-0.5 text-[9px] ${
          active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-400"
        }`}
      >
        {count}
      </span>
    </button>
  );
};

export default MixedFeed;