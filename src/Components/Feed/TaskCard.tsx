// import {
//   FaClock,
//   FaUsers,
//   FaArrowRight,
//   FaBriefcase,
//   FaEllipsisH,
// } from "react-icons/fa";

// import type { FeedTask } from "../../Types/feeds";

// type Props = {
//   task: FeedTask;
//   onApply: (taskId: number) => void;
// };

// const TaskCard = ({ task, onApply }: Props) => {
//   const initials = task.username?.slice(0, 2).toUpperCase() || "US";

//   const deadline = new Date(task.deadline);

//   const formattedDeadline = deadline.toLocaleDateString(undefined, {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });

//   const isExpired = deadline.getTime() < Date.now();

//   const status = task.status?.toLowerCase();

//   const statusStyles =
//     status === "ongoing"
//       ? "bg-amber-50 text-amber-700 border-amber-100"
//       : status === "completed"
//         ? "bg-emerald-50 text-emerald-700 border-emerald-100"
//         : status === "cancelled"
//           ? "bg-red-50 text-red-600 border-red-100"
//           : "bg-gray-100 text-gray-600 border-gray-200";

//   return (
//     <article className="group overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_35px_rgba(0,0,0,0.07)]">
//       {/* Opportunity accent */}
//       <div className="h-1 w-full bg-gray-900" />

//       <div className="p-5 sm:p-6">
//         {/* Header */}
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex min-w-0 items-center gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-white shadow-sm">
//               {initials}
//             </div>

//             <div className="min-w-0">
//               <div className="flex items-center gap-2">
//                 <p className="truncate text-sm font-bold text-gray-950">
//                   {task.username}
//                 </p>

//                 <span className="hidden rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:inline-flex">
//                   Task
//                 </span>
//               </div>

//               <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
//                 <FaBriefcase size={10} />

//                 <span className="truncate">{task.role}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex shrink-0 items-center gap-2">
//             <span
//               className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles}`}
//             >
//               {task.status}
//             </span>

//             <button
//               type="button"
//               className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
//             >
//               <FaEllipsisH size={13} />
//             </button>
//           </div>
//         </div>

//         {/* Task content */}
//         <div className="mt-6">
//           <h2 className="text-xl font-black leading-tight tracking-tight text-gray-950">
//             {task.title}
//           </h2>

//           <p className="mt-3 line-clamp-3 text-[14px] leading-7 text-gray-600">
//             {task.description}
//           </p>
//         </div>

//         {/* Reward + Applicants */}
//         <div className="mt-6 grid grid-cols-2 gap-3">
//           <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
//             <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
//               Reward
//             </p>

//             <div className="mt-2 flex items-baseline gap-1.5">
//               <span className="text-xl font-black text-gray-950">
//                 {task.reward}
//               </span>

//               <span className="text-xs font-semibold text-gray-400">USDC</span>
//             </div>
//           </div>

//           <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
//             <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
//               Applicants
//             </p>

//             <div className="mt-2 flex items-center gap-2">
//               <FaUsers className="text-gray-400" size={14} />

//               <span className="text-xl font-black text-gray-950">
//                 {task.applicant_count}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Deadline */}
//         <div
//           className={`mt-4 flex items-center justify-between rounded-2xl border px-4 py-3 ${
//             isExpired ? "border-red-100 bg-red-50" : "border-gray-100 bg-white"
//           }`}
//         >
//           <div className="flex items-center gap-2.5">
//             <div
//               className={`flex h-8 w-8 items-center justify-center rounded-full ${
//                 isExpired ? "bg-red-100" : "bg-gray-100"
//               }`}
//             >
//               <FaClock
//                 size={12}
//                 className={isExpired ? "text-red-500" : "text-gray-500"}
//               />
//             </div>

//             <div>
//               <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
//                 Deadline
//               </p>

//               <p
//                 className={`mt-0.5 text-xs font-semibold ${
//                   isExpired ? "text-red-600" : "text-gray-700"
//                 }`}
//               >
//                 {isExpired ? "Expired" : formattedDeadline}
//               </p>
//             </div>
//           </div>

//           {!isExpired && (
//             <span className="text-[10px] font-medium text-gray-400">
//               Apply before deadline
//             </span>
//           )}
//         </div>

//         {/* Action */}
//         <button
//           type="button"
//           disabled={isExpired}
//           onClick={() => onApply(task.id)}
//           className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-dark py-3.5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
//         >
//           {isExpired ? (
//             "Task Expired"
//           ) : (
//             <>
//               Apply for Task
//               <FaArrowRight
//                 size={12}
//                 className="transition-transform group-hover:translate-x-1"
//               />
//             </>
//           )}
//         </button>
//       </div>
//     </article>
//   );
// };

// export default TaskCard;

import { useEffect, useState } from "react";
import {
  FaClock,
  FaUsers,
  FaArrowRight,
  FaBriefcase,
  FaEllipsisH,
  FaTrash,
  FaEye,

  FaTimes,
  FaCheck,
  FaTimesCircle,
  FaStar,
  FaSpinner,
} from "react-icons/fa";

import type { FeedTask } from "../../Types/feeds";

type Props = {
  task: FeedTask;
  onApply?: (taskId: number) => void;
};

type Application = {
  ID: number;
  TaskID: number;
  ApplicantID: number;
  Username: string;
  Avatar: string;
  Reputation: number;
  Status: string;
};

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});

const TaskCard = ({ task, onApply }: Props) => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [application, setApplication] = useState<Application | null>(null);

  const [taskApplications, setTaskApplications] = useState<Application[]>([]);

  const [showApplications, setShowApplications] = useState(false);

  // const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Current User
  |--------------------------------------------------------------------------
  */

  const fetchCurrentUser = async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: getHeaders(),
    });

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      throw new Error(text || "Invalid server response");
    }

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Unable to get current user");
    }

    setCurrentUserId(result.data.id);

    return result.data.id;
  };

  /*
  |--------------------------------------------------------------------------
  | My Applications
  |--------------------------------------------------------------------------
  */

  const fetchMyApplication = async () => {
    try {
      const response = await fetch(`${API_URL}/task/getMyApplications`, {
        method: "GET",
        credentials: "include",
        headers: getHeaders(),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to fetch your applications");
      }

      const applications: Application[] = result.data || [];

      const found = applications.find((item) => item.TaskID === task.id);

      setApplication(found || null);

      return found || null;
    } catch (error) {
      console.error("Fetch application error:", error);
      return null;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  // const loadTaskState = async () => {
  //   try {
  //     setLoading(true);

  //     const userId = await fetchCurrentUser();

  //     // Don't need application lookup for your own task
  //     if (userId !== task.user_id) {
  //       await fetchMyApplication();
  //     }
  //   } catch (error) {
  //     console.error("Task state error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const loadTaskState = async () => {
    try {
      const userId = await fetchCurrentUser();

      // Don't need application lookup for your own task
      if (userId !== task.user_id) {
        await fetchMyApplication();
      }
    } catch (error) {
      console.error("Task state error:", error);
    }
  };

  useEffect(() => {
    loadTaskState();
  }, [task.id]);

  /*
  |--------------------------------------------------------------------------
  | Apply
  |--------------------------------------------------------------------------
  */

  const handleApply = async () => {
    try {
      setActionLoading(task.id);
      setError("");

      const response = await fetch(`${API_URL}/task/apply`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
        body: JSON.stringify({
          task_id: task.id,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to apply for task");
      }

      await fetchMyApplication();

      // Keep MixedFeed's parent in sync if supplied
      if (onApply) {
        onApply(task.id);
      }
    } catch (error) {
      console.error("Apply error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to apply for task",
      );
    } finally {
      setActionLoading(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Cancel Application
  |--------------------------------------------------------------------------
  */

  const handleCancelApplication = async () => {
    if (!application) return;

    try {
      setActionLoading(task.id);
      setError("");

      const response = await fetch(`${API_URL}/task/cancel`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
        body: JSON.stringify({
          id: application.ID,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to cancel application");
      }

      setApplication(null);

      if (onApply) {
        onApply(task.id);
      }
    } catch (error) {
      console.error("Cancel application error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to cancel application",
      );
    } finally {
      setActionLoading(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete Task
  |--------------------------------------------------------------------------
  */

  const handleDeleteTask = async () => {
    try {
      setActionLoading(task.id);
      setError("");

      const response = await fetch(`${API_URL}/task/delete`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
        body: JSON.stringify({
          task_id: task.id,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete task");
      }

      // Tell parent to reload feed
      if (onApply) {
        onApply(task.id);
      }
    } catch (error) {
      console.error("Delete task error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to delete task",
      );
    } finally {
      setActionLoading(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Get Task Applications
  |--------------------------------------------------------------------------
  */

  const handleGetTaskApplications = async () => {
    try {
      setActionLoading(task.id);
      setError("");

      const response = await fetch(
        `${API_URL}/task/${task.id}/getTaskApplications`,
        {
          method: "GET",
          credentials: "include",
          headers: getHeaders(),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to fetch applications");
      }

      setTaskApplications(result.data || []);

      setShowApplications(true);
    } catch (error) {
      console.error("Get applications error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to fetch applications",
      );
    } finally {
      setActionLoading(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Accept Applicant
  |--------------------------------------------------------------------------
  */

  const handleAcceptEmployee = async (applicationId: number) => {
    try {
      setActionLoading(applicationId);
      setError("");

      const response = await fetch(`${API_URL}/task/accept`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
        body: JSON.stringify({
          id: applicationId,
          task_id: task.id,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to accept applicant");
      }

      await refreshApplications();
    } catch (error) {
      console.error("Accept applicant error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to accept applicant",
      );
    } finally {
      setActionLoading(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Reject Applicant
  |--------------------------------------------------------------------------
  */

  const handleRejectEmployee = async (applicationId: number) => {
    try {
      setActionLoading(applicationId);
      setError("");

      const response = await fetch(`${API_URL}/task/reject`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
        body: JSON.stringify({
          id: applicationId,
          task_id: task.id,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to reject applicant");
      }

      await refreshApplications();
    } catch (error) {
      console.error("Reject applicant error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to reject applicant",
      );
    } finally {
      setActionLoading(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Refresh Applications
  |--------------------------------------------------------------------------
  */

  const refreshApplications = async () => {
    const response = await fetch(
      `${API_URL}/task/${task.id}/getTaskApplications`,
      {
        method: "GET",
        credentials: "include",
        headers: getHeaders(),
      },
    );

    const result = await response.json();

    if (response.ok && result.success) {
      setTaskApplications(result.data || []);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  const initials = task.username?.slice(0, 2).toUpperCase() || "US";

  const deadline = new Date(task.deadline);

  const formattedDeadline = deadline.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isExpired = deadline.getTime() < Date.now();

  const isOwner = currentUserId !== null && currentUserId === task.user_id;

  const status = task.status?.toLowerCase();

  const statusStyles =
    status === "ongoing"
      ? "bg-amber-50 text-amber-700 border-amber-100"
      : status === "completed"
        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
        : status === "cancelled"
          ? "bg-red-50 text-red-600 border-red-100"
          : "bg-gray-100 text-gray-600 border-gray-200";

  const isActionLoading = actionLoading !== null;

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <article className="group overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_35px_rgba(0,0,0,0.07)]">
        {/* Accent */}
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
                    {task.username}
                  </p>

                  <span className="hidden rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:inline-flex">
                    Task
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                  <FaBriefcase size={10} />

                  <span className="truncate">{task.role}</span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles}`}
              >
                {task.status}
              </span>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <FaEllipsisH size={13} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="mt-6">
            <h2 className="text-xl font-black leading-tight tracking-tight text-gray-950">
              {task.title}
            </h2>

            <p className="mt-3 line-clamp-3 text-[14px] leading-7 text-gray-600">
              {task.description}
            </p>
          </div>

          {/* Reward / Applicants */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                Reward
              </p>

              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-xl font-black text-gray-950">
                  {task.reward}
                </span>

                <span className="text-xs font-semibold text-gray-400">
                  USDC
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                Applicants
              </p>

              <div className="mt-2 flex items-center gap-2">
                <FaUsers className="text-gray-400" size={14} />

                <span className="text-xl font-black text-gray-950">
                  {task.applicant_count}
                </span>
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div
            className={`mt-4 flex items-center justify-between rounded-2xl border px-4 py-3 ${
              isExpired
                ? "border-red-100 bg-red-50"
                : "border-gray-100 bg-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isExpired ? "bg-red-100" : "bg-gray-100"
                }`}
              >
                <FaClock
                  size={12}
                  className={isExpired ? "text-red-500" : "text-gray-500"}
                />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                  Deadline
                </p>

                <p
                  className={`mt-0.5 text-xs font-semibold ${
                    isExpired ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  {isExpired ? "Expired" : formattedDeadline}
                </p>
              </div>
            </div>

            {!isExpired && (
              <span className="text-[10px] font-medium text-gray-400">
                Apply before deadline
              </span>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
            {/* OWNER */}
            {isOwner ? (
              <>
                <button
                  type="button"
                  disabled={isActionLoading}
                  onClick={handleDeleteTask}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-xs font-bold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                >
                  {actionLoading === task.id ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTrash size={12} />
                  )}
                  Delete Task
                </button>

                <button
                  type="button"
                  disabled={isActionLoading}
                  onClick={handleGetTaskApplications}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-dark py-3 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {actionLoading === task.id ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaEye size={12} />
                  )}
                  Applications
                </button>
              </>
            ) : (
              /* NOT OWNER */
              <>
                {isExpired ? (
                  <button
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-100 py-3.5 text-sm font-bold text-gray-400"
                  >
                    Task Expired
                  </button>
                ) : application ? (
                  <button
                    type="button"
                    disabled={isActionLoading}
                    onClick={handleCancelApplication}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 py-3.5 text-sm font-bold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  >
                    {actionLoading === task.id ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaTimes size={12} />
                    )}
                    Withdraw Application
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isActionLoading}
                    onClick={handleApply}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark py-3.5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0 disabled:opacity-50"
                  >
                    {actionLoading === task.id ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <>
                        Apply for Task
                        <FaArrowRight
                          size={12}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </article>

      {/* ================================================================ */}
      {/* APPLICATIONS MODAL */}
      {/* ================================================================ */}

      {showApplications && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-black/10 p-5">
              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">
                  Task Applications
                </p>

                <h2 className="truncate text-lg font-bold text-black">
                  {task.title}
                </h2>

                <p className="mt-1 text-xs text-black/45">
                  {taskApplications.length}{" "}
                  {taskApplications.length === 1 ? "applicant" : "applicants"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowApplications(false)}
                className="rounded-lg p-2 text-black/40 transition hover:bg-black/5 hover:text-black"
              >
                <FaTimes />
              </button>
            </div>

            {/* Applications */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {taskApplications.length > 0 ? (
                <div className="space-y-2">
                  {taskApplications.map((app) => {
                    const isProcessing = actionLoading === app.ID;

                    const status = app.Status?.toLowerCase();

                    return (
                      <div
                        key={app.ID}
                        className="flex items-center justify-between gap-3 rounded-xl border border-black/8 bg-black/[0.02] p-3 transition hover:bg-gray-50"
                      >
                        {/* Applicant */}
                        <div className="flex min-w-0 items-center gap-3">
                          {app.Avatar ? (
                            <img
                              src={app.Avatar}
                              alt={app.Username}
                              className="h-9 w-9 shrink-0 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-black">
                              {app.Username?.charAt(0).toUpperCase() || "A"}
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-black">
                              {app.Username}
                            </p>

                            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-black/45">
                              <FaStar className="text-black" size={10} />

                              <span className="font-semibold text-black/70">
                                {app.Reputation ?? "N/A"}
                              </span>

                              <span>reputation</span>
                            </div>
                          </div>
                        </div>

                        {/* Application status/actions */}
                        <div className="flex shrink-0 items-center gap-2">
                          {status === "accepted" ? (
                            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                              <FaCheck size={9} />
                              Accepted
                            </span>
                          ) : status === "rejected" ? (
                            <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-600">
                              <FaTimesCircle size={10} />
                              Rejected
                            </span>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                disabled={isProcessing}
                                onClick={() => handleRejectEmployee(app.ID)}
                                className="rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                              >
                                {isProcessing ? (
                                  <FaSpinner className="animate-spin" />
                                ) : (
                                  "Reject"
                                )}
                              </button>

                              <button
                                type="button"
                                disabled={isProcessing}
                                onClick={() => handleAcceptEmployee(app.ID)}
                                className="rounded-lg bg-brand-dark px-2.5 py-1.5 text-[10px] font-bold text-white transition hover:opacity-80 disabled:opacity-50"
                              >
                                {isProcessing ? (
                                  <FaSpinner className="animate-spin" />
                                ) : (
                                  "Accept"
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                    <FaUsers className="text-gray-500" size={18} />
                  </div>

                  <p className="text-sm font-bold text-black">
                    No applications yet
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Applicants will appear here when they apply.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-black/10 bg-black/[0.02] p-4">
              <button
                type="button"
                onClick={() => setShowApplications(false)}
                className="rounded-xl bg-brand-dark px-5 py-2.5 text-xs font-bold text-white transition hover:opacity-80"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;