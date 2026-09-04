

// import { useEffect, useMemo, useState } from "react";
// import {
//   FaPlus,
//   FaSyncAlt,
//   FaLayerGroup,
//   FaTasks,
//   FaComments,
//   FaFire,
// } from "react-icons/fa";

// import { getDashboardFeed } from "../../Servives/Feeds";
// import type { DashboardFeedItem } from "../../Types/feeds";

// import PostCard from "./Postcard";
// import TaskCard from "./TaskCard";
// import CommentsSection from "./CommentsSection";

// type FeedFilter = "all" | "tasks" | "posts";

// const MixedFeed = () => {
//   const [openComments, setOpenComments] = useState<number | null>(null);
//   const [feed, setFeed] = useState<DashboardFeedItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState("");
//   const [filter, setFilter] = useState<FeedFilter>("all");

//   const loadFeed = async (isRefresh = false) => {
//     try {
//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }

//       setError("");

//       const data = await getDashboardFeed();
//       setFeed(data);
//     } catch (error) {
//       console.error(error);

//       setError(error instanceof Error ? error.message : "Failed to load feed");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
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
//         if (item.type !== "post" || item.post_id !== postId) {
//           return item;
//         }

//         return {
//           ...item,
//           comments: item.comments + 1,
//         };
//       }),
//     );
//   };

//   const filteredFeed = useMemo(() => {
//     if (filter === "all") {
//       return feed;
//     }

//     return feed.filter((item) => item.type === filter.slice(0, -1));
//   }, [feed, filter]);

//   const taskCount = feed.filter((item) => item.type === "task").length;
//   const postCount = feed.filter((item) => item.type === "post").length;

//   /* ---------------- LOADING ---------------- */

//   if (loading) {
//     return (
//       <div className="space-y-4">
//         {/* Header skeleton */}
//         <div className="animate-pulse">
//           <div className="h-4 w-24 rounded bg-slate-200" />
//           <div className="mt-3 h-8 w-52 rounded bg-slate-200" />
//         </div>

//         {[1, 2, 3].map((item) => (
//           <div
//             key={item}
//             className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
//           >
//             <div className="animate-pulse p-5">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-full bg-slate-200" />

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

//   /* ---------------- ERROR ---------------- */

//   if (error) {
//     return (
//       <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
//         <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-sm font-black text-red-600">
//           !
//         </div>

//         <h3 className="mt-4 font-bold text-slate-900">
//           Couldn't load your feed
//         </h3>

//         <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
//           {error}
//         </p>

//         <button
//           onClick={() => loadFeed()}
//           className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-95"
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
//       <div className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
//         <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
//           <FaLayerGroup className="text-slate-400" />
//         </div>

//         <h3 className="mt-5 text-lg font-black text-slate-900">
//           Nothing here yet
//         </h3>

//         <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
//           New community posts and available tasks will show up here.
//         </p>

//         <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800">
//           <FaPlus size={11} />
//           Create something
//         </button>
//       </div>
//     );
//   }

//   /* ---------------- MAIN FEED ---------------- */

//   return (
//     <section className="w-full">
//       {/* HEADER */}
//       <div className="mb-5">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
//               <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100">
//                 <FaFire size={10} />
//               </span>
//               Your hub
//             </div>

//             <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
//               Latest activity
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Discover what's happening around the community.
//             </p>
//           </div>

//           {/* REFRESH */}
//           <button
//             type="button"
//             onClick={() => loadFeed(true)}
//             disabled={refreshing}
//             title="Refresh feed"
//             className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <FaSyncAlt
//               size={12}
//               className={
//                 refreshing
//                   ? "animate-spin"
//                   : "transition-transform group-hover:rotate-45"
//               }
//             />
//           </button>
//         </div>

//         {/* FILTER BAR */}
//         <div className="mt-6 flex items-center justify-between gap-3">
//           <div className="flex w-fit items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
//             <FilterButton
//               active={filter === "all"}
//               onClick={() => setFilter("all")}
//               icon={<FaLayerGroup size={10} />}
//               label="All"
//               count={feed.length}
//             />

//             <FilterButton
//               active={filter === "tasks"}
//               onClick={() => setFilter("tasks")}
//               icon={<FaTasks size={10} />}
//               label="Tasks"
//               count={taskCount}
//             />

//             <FilterButton
//               active={filter === "posts"}
//               onClick={() => setFilter("posts")}
//               icon={<FaComments size={10} />}
//               label="Posts"
//               count={postCount}
//             />
//           </div>

//           <span className="hidden text-xs font-medium text-slate-400 sm:block">
//             {filteredFeed.length} {filteredFeed.length === 1 ? "item" : "items"}
//           </span>
//         </div>
//       </div>

//       {/* FEED */}
//       <div className="relative">
//         {/* Timeline */}
//         <div className="absolute bottom-4 left-[19px] top-5 hidden w-px bg-slate-200 sm:block" />

//         <div className="space-y-4">
//           {filteredFeed.length === 0 ? (
//             <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
//               <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-300 shadow-sm">
//                 {filter === "tasks" ? (
//                   <FaTasks size={15} />
//                 ) : (
//                   <FaComments size={15} />
//                 )}
//               </div>

//               <p className="mt-4 text-sm font-semibold text-slate-700">
//                 No {filter} yet
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Check back later for new activity.
//               </p>
//             </div>
//           ) : (
//             filteredFeed.map((item) => {
//               /* -------- POST -------- */

//               if (item.type === "post") {
//                 return (
//                   <div
//                     key={`post-${item.post_id}`}
//                     className="group relative sm:pl-10"
//                   >
//                     {/* Timeline dot */}
//                     <div className="absolute left-[13px] top-7 hidden h-3.5 w-3.5 rounded-full border-[3px] border-slate-50 bg-slate-950 transition-transform group-hover:scale-125 sm:block" />

//                     <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-slate-300 hover:shadow-md">
//                       <PostCard post={item} onComment={handleComment} />
//                     </article>

//                     {openComments === item.post_id && (
//                       <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">
//                         <CommentsSection
//                           postID={item.post_id}
//                           onCommentCreated={() => handleCommentCreated(item.post_id)}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 );
//               }

//               /* -------- TASK -------- */

//               if (item.type === "task") {
//                 return (
//                   <div
//                     key={`task-${item.id}`}
//                     className="group relative sm:pl-10"
//                   >
//                     {/* Timeline dot */}
//                     <div className="absolute left-[11px] top-7 hidden h-[17px] w-[17px] items-center justify-center rounded-full border-[3px] border-slate-50 bg-black sm:flex">
//                       <span className="h-1.5 w-1.5 rounded-full bg-[#e8e3d5]" />
//                     </div>

//                     <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-slate-300 hover:shadow-md">
//                       {/* TASK LABEL */}
//                       <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
//                         <div className="flex items-center gap-2">
//                           <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-950 text-white">
//                             <FaTasks size={9} />
//                           </span>

//                           <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
//                             New opportunity
//                           </span>
//                         </div>

//                         <span className="text-[10px] font-medium text-slate-400">
//                           Task
//                         </span>
//                       </div>

//                       <TaskCard task={item} />
//                     </article>
//                   </div>
//                 );
//               }

//               return null;
//             })
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// /* ---------------- FILTER BUTTON ---------------- */

// const FilterButton = ({
//   active,
//   onClick,
//   icon,
//   label,
//   count,
// }: {
//   active: boolean;
//   onClick: () => void;
//   icon: React.ReactNode;
//   label: string;
//   count: number;
// }) => {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
//         active
//           ? "bg-slate-950 text-white shadow-sm"
//           : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
//       }`}
//     >
//       {icon}

//       <span>{label}</span>

//       <span
//         className={`rounded-md px-1.5 py-0.5 text-[9px] ${
//           active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-400"
//         }`}
//       >
//         {count}
//       </span>
//     </button>
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
  /*
   * IMPORTANT:
   * This stores the post_id of the ONLY post whose
   * comments are currently open.
   *
   * null = no comments open
   */
  const [openComments, setOpenComments] = useState<number | null>(
    null,
  );

  const [feed, setFeed] = useState<DashboardFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FeedFilter>("all");

  /* --------------------------------
     LOAD FEED
  -------------------------------- */

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

      /*
       * Don't keep an open comment section for a post
       * that no longer exists in the feed.
       */
      setOpenComments((currentOpenPost) => {
        if (currentOpenPost === null) {
          return null;
        }

        const stillExists = data.some(
          (item) => item.type === "post" && item.id === currentOpenPost,
        );

        return stillExists ? currentOpenPost : null;
      });
    } catch (error) {
      console.error("Failed to load feed:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load feed",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /* --------------------------------
     INITIAL LOAD
  -------------------------------- */

  useEffect(() => {
    loadFeed();
  }, []);

  /* --------------------------------
     COMMENT TOGGLE
  -------------------------------- */

  const handleComment = (postId: number) => {
    setOpenComments((currentPostId) => {
      /*
       * Click same post:
       * close comments.
       */
      if (currentPostId === postId) {
        return null;
      }

      /*
       * Click another post:
       * close previous and open this one.
       */
      return postId;
    });
  };

  /* --------------------------------
     COMMENT CREATED
  -------------------------------- */

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

  /* --------------------------------
     FILTER FEED
  -------------------------------- */

  const filteredFeed = useMemo(() => {
    if (filter === "all") {
      return feed;
    }

    const type =
      filter === "tasks"
        ? "task"
        : "post";

    return feed.filter(
      (item) => item.type === type,
    );
  }, [feed, filter]);

  const taskCount = feed.filter(
    (item) => item.type === "task",
  ).length;

  const postCount = feed.filter(
    (item) => item.type === "post",
  ).length;

  /* --------------------------------
     LOADING
  -------------------------------- */

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

  /* --------------------------------
     ERROR
  -------------------------------- */

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
          type="button"
          onClick={() => loadFeed()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-95"
        >
          <FaSyncAlt size={12} />
          Try again
        </button>

      </div>
    );
  }

  /* --------------------------------
     EMPTY
  -------------------------------- */

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

        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          <FaPlus size={11} />
          Create something
        </button>

      </div>
    );
  }

  /* --------------------------------
     MAIN FEED
  -------------------------------- */

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
            {filteredFeed.length}{" "}
            {filteredFeed.length === 1
              ? "item"
              : "items"}
          </span>

        </div>

      </div>

      {/* FEED */}
      <div className="relative">

        {/* Timeline */}
        <div className="absolute bottom-4 left-[19px] top-5 hidden w-px bg-slate-200 sm:block" />

        <div className="space-y-4">

          {/* No results after filter */}
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

              /* =========================
                 POST
              ========================== */

            if (item.type === "post") {
              const postId = item.id;

              return (
                <div key={`post-${postId}`} className="group relative sm:pl-10">
                  {/* Timeline dot */}
                  <div className="absolute left-[13px] top-7 hidden h-3.5 w-3.5 rounded-full border-[3px] border-slate-50 bg-slate-950 transition-transform group-hover:scale-125 sm:block" />

                  {/* Post */}
                  <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-slate-300 hover:shadow-md">
                    <PostCard post={item} onComment={handleComment} />
                  </article>

                  {/* COMMENTS */}

                  {openComments === postId && (
                    <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <CommentsSection
                        postID={postId}
                        onCommentCreated={() => handleCommentCreated(postId)}
                      />
                    </div>
                  )}
                </div>
              );
            }

              /* =========================
                 TASK
              ========================== */

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

/* =====================================
   FILTER BUTTON
===================================== */

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
          active
            ? "bg-white/15 text-white"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {count}
      </span>
    </button>
  );
};

export default MixedFeed;
