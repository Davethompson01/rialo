import { useEffect, useState } from "react";
import { handleResponse } from "../../Servives/negotiationApi";
import {
  Users,
  Clock,
  Coins,
  Trash2,
  Eye,
  Send,
  X,
  AlertCircle,
  MessageCircle,
  Loader2,
  Briefcase,
  Star,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";



type FeedTask = {
  id: number;
  userId: number;
  employerId: number;
  creator: string;
  role: string;
  title: string;
  description: string;
  reward: number;
  applicants: number;
  deadline: string;
  status: string;
  avatar: string;

  isApplied: boolean;
  applicationID: number | null;
};

type Application = {
  ID: number;
  TaskID: number;
  ApplicantID: number;
  ConversationID?: number;
  Username: string;
  Avatar: string;
  Reputation: number;
  Status: string;
};






const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const TaskFeeds = () => {
  const [tasks, setTasks] = useState<FeedTask[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState("");

  const [selectedTask, setSelectedTask] = useState<FeedTask | null>(null);
  const [showApplications, setShowApplications] = useState(false);
  const [taskApplications, setTaskApplications] = useState<Application[]>([]);

  const navigate = useNavigate();

  const getHeaders = () => ({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  });

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

  const fetchTasks = async () => {
    const response = await fetch(`${API_URL}/task/taskfeeds`, {
      method: "GET",
      credentials: "include",
      headers: getHeaders(),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Unable to fetch tasks");
    }
    console.log(result)

    const formattedTasks: FeedTask[] = result.data.map((task: any) => ({
      id: task.id,
      userId: task.user_id,
      employerId: task.employer_id,
      creator: task.username,
      role: task.role,
      title: task.title,
      description: task.description,
      reward: task.reward,
      applicants: task.applicant_count,
      deadline: task.deadline,
      status: task.status,
      avatar: task.profile_picture,
      isApplied: task.IsApplied,
      applicationID: task.ApplicationID,
    }));

    console.log(formattedTasks, "formatted text")

    setTasks(formattedTasks);

    return formattedTasks;
  };

  const fetchMyApplications = async () => {
    const response = await fetch(`${API_URL}/task/getMyApplications`, {
      method: "GET",
      credentials: "include",
      headers: getHeaders(),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Unable to fetch your applications");
    }

    setApplications(result.data || []);

    return result.data || [];
  };

  const loadFeed = async () => {
    try {
      setLoading(true);
      setError("");

      await fetchCurrentUser();

      await Promise.all([fetchTasks(), fetchMyApplications()]);
    } catch (error: any) {
      console.error("Feed loading error:", error);
      setError(error.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  async function createNegotiation(payload: {
    TaskId: number;
    ApplicationID: number;
    Status: string;
    Content: string;
    offer: { task_id: number; new_offer: number; status: string };
  }) {
    const response = await fetch(
      `${API_URL}/conversations/negotiateapplicant`,
      {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      },
    );

    return handleResponse(response);
  }

// ```ts
const handleNegotiate = async (task: FeedTask) => {
  try {
    setActionLoading(task.id);
    setError("");

    console.log("Task ID:", task.id);
    console.log("Application ID:", task.applicationID);
    console.log("Is Applied:", task.isApplied);

    if (!task.isApplied || !task.applicationID) {
      throw new Error("You must apply to this task before negotiating");
    }

    const result = await createNegotiation({
      TaskId: task.id,
      ApplicationID: task.applicationID,
      Content: "I'd like to discuss this task.",
      Status: "pending",
      offer: {
        task_id: task.id,
        new_offer: task.reward,
        status: "pending",
      },
    });

    const conversationId = result.data?.conversation_id;

    if (!conversationId) {
      throw new Error("No conversation ID returned");
    }

    navigate(`/negotiate/${conversationId}`, {
      state: {
        taskId: task.id,
        employerId: task.employerId,
      },
    });
  } catch (error: any) {
    console.error("Negotiation error:", error);
    setError(error.message || "Failed to start negotiation");
  } finally {
    setActionLoading(null);
  }
};
  useEffect(() => {
    loadFeed();
  }, []);

  const handleApply = async (task: FeedTask) => {
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

      await Promise.all([fetchMyApplications(), fetchTasks()]);
    } catch (error: any) {
      console.error("Apply error:", error);
      setError(error.message || "Failed to apply for task");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelApplication = async (
    applicationId: number,
    taskId: number,
  ) => {
    try {
      setActionLoading(taskId);
      setError("");

      const response = await fetch(`${API_URL}/task/cancel`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
        body: JSON.stringify({
          id: applicationId,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to cancel application");
      }

      await Promise.all([fetchMyApplications(), fetchTasks()]);
    } catch (error: any) {
      console.error("Cancel application error:", error);
      setError(error.message || "Failed to cancel application");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      setActionLoading(taskId);
      setError("");

      const response = await fetch(`${API_URL}/task/delete`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
        body: JSON.stringify({
          task_id: taskId,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete task");
      }

      setTasks((prev) => prev.filter((task) => task.id !== taskId));

      if (selectedTask?.id === taskId) {
        setSelectedTask(null);
      }
    } catch (error: any) {
      console.error("Delete task error:", error);
      setError(error.message || "Failed to delete task");
    } finally {
      setActionLoading(null);
    }
  };

  const handleGetTaskApplications = async (task: FeedTask) => {
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

      setSelectedTask(task);
      setTaskApplications(result.data || []);
      setShowApplications(true);
    } catch (error: any) {
      console.error("Get applications error:", error);
      setError(error.message || "Failed to fetch applications");
    } finally {
      setActionLoading(null);
    }
  };

  const handleAcceptEmployee = async (
    applicationId: number,
    taskId: number,
  ) => {
    try {
      setActionLoading(taskId);
      setError("");

      const response = await fetch(`${API_URL}/task/accept`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
        body: JSON.stringify({
          id: applicationId,
          task_id: taskId,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to accept applicant");
      }

      // Reload applications directly
      const applicationsResponse = await fetch(
        `${API_URL}/task/${taskId}/getTaskApplications`,
        {
          method: "GET",
          credentials: "include",
          headers: getHeaders(),
        },
      );

      const applicationsResult = await applicationsResponse.json();

      if (applicationsResponse.ok && applicationsResult.success) {
        setTaskApplications(applicationsResult.data || []);
      }

      await fetchTasks();
    } catch (error: any) {
      console.error("Accept applicant error:", error);
      setError(error.message || "Failed to accept applicant");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectEmployee = async (
    applicationId: number,
    taskId: number,
  ) => {
    try {
      setActionLoading(taskId);
      setError("");

      const response = await fetch(`${API_URL}/task/reject`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
        body: JSON.stringify({
          id: applicationId,
          task_id: taskId,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to reject applicant");
      }

      const applicationsResponse = await fetch(
        `${API_URL}/task/${taskId}/getTaskApplications`,
        {
          method: "GET",
          credentials: "include",
          headers: getHeaders(),
        },
      );

      const applicationsResult = await applicationsResponse.json();

      if (applicationsResponse.ok && applicationsResult.success) {
        setTaskApplications(applicationsResult.data || []);
      }

      await fetchTasks();
    } catch (error: any) {
      console.error("Reject applicant error:", error);
      setError(error.message || "Failed to reject applicant");
    } finally {
      setActionLoading(null);
    }
  };

  const getApplicationForTask = (taskId: number) => {
    return applications.find((application) => application.TaskID === taskId);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";

    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-black/10 bg-white p-5"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-black/10" />

                <div className="space-y-2">
                  <div className="h-3 w-24 rounded bg-black/10" />
                  <div className="h-2.5 w-16 rounded bg-black/10" />
                </div>
              </div>

              <div className="mb-3 h-5 w-3/4 rounded bg-black/10" />
              <div className="mb-2 h-3 w-full rounded bg-black/10" />
              <div className="mb-5 h-3 w-2/3 rounded bg-black/10" />

              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 rounded-xl bg-black/10" />
                <div className="h-12 rounded-xl bg-black/10" />
                <div className="h-12 rounded-xl bg-black/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Main UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      {/* Error */}
      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0" />

          <p className="flex-1 font-medium">{error}</p>

          <button
            onClick={() => setError("")}
            className="cursor-pointer text-red-500 transition hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
            Marketplace
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-black">
            Available Tasks
          </h2>
        </div>

        <span className="rounded-full bg-[#e8e3d5] px-3 py-1 text-xs font-semibold text-black">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {/* Task Grid */}
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {tasks.map((task) => {
            const isOwner = task.userId === currentUserId;
            const application = getApplicationForTask(task.id);
            const hasApplied = application !== undefined;
            const isLoading = actionLoading === task.id;

            return (
              <div
                key={task.id}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-black/10
                  bg-white
                  p-5
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-black/20
                  hover:shadow-lg
                "
              >
                {/* Small primary accent */}
                <div className="absolute left-0 top-0 h-full w-1 bg-[#e8e3d5]" />

                {/* Header */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {task.avatar ? (
                      <img
                        src={task.avatar}
                        alt={task.creator}
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8e3d5] text-sm font-bold text-black">
                        {task.creator?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-black">
                        {task.creator}
                      </p>

                      {task.role && (
                        <div className="mt-0.5 flex items-center gap-1 text-[11px] text-black/45">
                          <Briefcase className="h-3 w-3" />
                          <span className="truncate">{task.role}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`
                      shrink-0
                      rounded-full
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wide
                      ${
                        task.status?.toLowerCase() === "active" ||
                        task.status?.toLowerCase() === "open"
                          ? "bg-[#e8e3d5] text-black"
                          : "bg-black/5 text-black/50"
                      }
                    `}
                  >
                    {task.status || "Active"}
                  </span>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <h3 className="mb-1.5 line-clamp-1 text-base font-bold text-black transition group-hover:underline">
                    {task.title}
                  </h3>

                  <p className="line-clamp-2 text-xs leading-5 text-black/55">
                    {task.description}
                  </p>
                </div>

                {/* Small information boxes */}
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {/* Reward */}
                  <div className="rounded-xl border border-black/8 bg-[#e8e3d5]/45 p-2.5">
                    <div className="mb-1 flex items-center gap-1.5 text-black/40">
                      <Coins className="h-3.5 w-3.5" />

                      <span className="text-[9px] font-bold uppercase tracking-wide">
                        Reward
                      </span>
                    </div>

                    <p className="text-sm font-bold text-black">
                      ${task.reward}
                    </p>
                  </div>

                  {/* Applicants */}
                  <div className="rounded-xl border border-black/8 bg-black/[0.025] p-2.5">
                    <div className="mb-1 flex items-center gap-1.5 text-black/40">
                      <Users className="h-3.5 w-3.5" />

                      <span className="text-[9px] font-bold uppercase tracking-wide">
                        Applied
                      </span>
                    </div>

                    <p className="text-sm font-bold text-black">
                      {task.applicants || 0}
                    </p>
                  </div>

                  {/* Deadline */}
                  <div className="rounded-xl border border-black/8 bg-black/[0.025] p-2.5">
                    <div className="mb-1 flex items-center gap-1.5 text-black/40">
                      <Clock className="h-3.5 w-3.5" />

                      <span className="text-[9px] font-bold uppercase tracking-wide">
                        Due
                      </span>
                    </div>

                    <p className="truncate text-xs font-bold text-black">
                      {formatDate(task.deadline)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 border-t border-black/8 pt-4">
                  {isOwner ? (
                    <>
                      <button
                        disabled={isLoading}
                        onClick={() => handleDeleteTask(task.id)}
                        className="
                          flex
                          flex-1
                          cursor-pointer
                          items-center
                          justify-center
                          gap-1.5
                          rounded-xl
                          border
                          border-black/10
                          bg-white
                          px-3
                          py-2.5
                          text-xs
                          font-semibold
                          text-black/60
                          transition
                          hover:border-red-200
                          hover:bg-red-50
                          hover:text-red-600
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        {isLoading ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                        Cancel
                      </button>

                      <button
                        disabled={isLoading}
                        onClick={() => handleGetTaskApplications(task)}
                        className="
                          flex
                          flex-1
                          cursor-pointer
                          items-center
                          justify-center
                          gap-1.5
                          rounded-xl
                          bg-[#020202]
                          px-3
                          py-2.5
                          text-xs
                          font-semibold
                          text-white
                          transition
                          hover:bg-black/80
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        {isLoading ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                        Applications
                      </button>
                    </>
                  ) : !hasApplied ? (
                    <div className="flex w-full gap-2">
                      {/* Apply */}
                      <button
                        disabled={isLoading}
                        onClick={() => handleApply(task)}
                        className="
        flex
        flex-1
        cursor-pointer
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-[#020202]
        px-4
        py-2.5
        text-xs
        font-bold
        text-white
        transition
        hover:bg-black/80
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-3.5 w-3.5" />
                        )}
                        Apply for Task
                      </button>

                      {/* Negotiate */}
                      {/* <button
                        disabled={isLoading}
                        onClick={() => handleNegotiate(task)}
                        className="
        flex
        flex-1
        cursor-pointer
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-black/10
        bg-[#e8e3d5]
        px-4
        py-2.5
        text-xs
        font-bold
        text-black
        transition
        hover:bg-[#ded8c8]
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Negotiate
                      </button> */}
                    </div>
                  ) : (
                    <>
                      <button
                        disabled={isLoading}
                        onClick={() =>
                          handleCancelApplication(application.ID, task.id)
                        }
                        className="
        flex
        w-full
        cursor-pointer
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-black/10
        bg-[#e8e3d5]
        px-4
        py-2.5
        text-xs
        font-bold
        text-black
        transition
        hover:bg-[#ded8c8]
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-3.5 w-3.5" />
                        )}
                        Withdraw Application
                      </button>

                      <button
                        disabled={isLoading}
                        onClick={() => handleNegotiate(task)}
                        className="
        flex
        w-full
        cursor-pointer
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-black/10
        bg-[#e8e3d5]
        px-4
        py-2.5
        text-xs
        font-bold
        text-black
        transition
        hover:bg-[#ded8c8]
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Negotiate
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div className="rounded-2xl border border-black/10 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8e3d5]">
            <Briefcase className="h-6 w-6 text-black" />
          </div>

          <h3 className="mb-1 text-base font-bold text-black">
            No tasks available
          </h3>

          <p className="text-sm text-black/45">
            Check back later or create a task yourself.
          </p>
        </div>
      )}

      {/* Applications Modal */}
      {showApplications && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-black/10 p-5">
              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">
                  Task Applications
                </p>

                <h2 className="truncate text-lg font-bold text-black">
                  {selectedTask.title}
                </h2>

                <p className="mt-1 text-xs text-black/45">
                  {taskApplications.length}{" "}
                  {taskApplications.length === 1 ? "applicant" : "applicants"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowApplications(false);
                  setSelectedTask(null);
                  setTaskApplications([]);
                }}
                className="cursor-pointer rounded-lg p-2 text-black/40 transition hover:bg-black/5 hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Applicants */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {taskApplications.length > 0 ? (
                <div className="space-y-2">
                  {taskApplications.map((app) => (
                    <div
                      key={app.ID}
                      className="flex items-center justify-between gap-3 rounded-xl border border-black/8 bg-black/[0.02] p-3 transition hover:bg-[#e8e3d5]/30"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {app.Avatar ? (
                          <img
                            src={app.Avatar}
                            alt={app.Username}
                            className="h-9 w-9 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8e3d5] text-xs font-bold text-black">
                            {app.Username?.charAt(0).toUpperCase() || "A"}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-black">
                            {app.Username}
                          </p>

                          <div className="mt-0.5 flex items-center gap-1 text-[11px] text-black/45">
                            <Star className="h-3 w-3 fill-current text-black" />

                            <span className="font-semibold text-black/70">
                              {app.Reputation ?? "N/A"}
                            </span>

                            <span>reputation</span>
                          </div>
                        </div>
                      </div>

                      {/* Status */}

                      <div className="flex shrink-0 items-center gap-2">
                        {app.Status?.toLowerCase() === "accepted" ? (
                          <span className="flex items-center gap-1 rounded-full bg-[#e8e3d5] px-2.5 py-1 text-[10px] font-bold text-black">
                            <CheckCircle2 className="h-3 w-3" />
                            Accepted
                          </span>
                        ) : app.Status?.toLowerCase() === "rejected" ? (
                          <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-600">
                            <XCircle className="h-3 w-3" />
                            Rejected
                          </span>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            {/* Message */}
                            {/* <button
                              type="button"
                              onClick={() =>
                                handleOpenNegotiation(app, selectedTask)
                              }
                              className="
      cursor-pointer
      rounded-lg
      border
      border-black/10
      bg-white
      px-2.5
      py-1.5
      text-[10px]
      font-bold
      text-black
      transition
      hover:bg-[#e8e3d5]
    "
                            >
                              Message
                            </button> */}
                            {/* Reject */}
                            <button
                              type="button"
                              disabled={actionLoading === selectedTask.id}
                              onClick={() =>
                                handleRejectEmployee(app.ID, selectedTask.id)
                              }
                              className="
          cursor-pointer
          rounded-lg
          border
          border-red-200
          bg-white
          px-2.5
          py-1.5
          text-[10px]
          font-bold
          text-red-600
          transition
          hover:bg-red-50
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
                            >
                              {actionLoading === selectedTask.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                "Reject"
                              )}
                            </button>

                            {/* Accept */}
                            <button
                              type="button"
                              disabled={actionLoading === selectedTask.id}
                              onClick={() =>
                                handleAcceptEmployee(app.ID, selectedTask.id)
                              }
                              className="
          cursor-pointer
          rounded-lg
          bg-[#020202]
          px-2.5
          py-1.5
          text-[10px]
          font-bold
          text-white
          transition
          hover:bg-black/80
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
                            >
                              {actionLoading === selectedTask.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                "Accept"
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8e3d5]">
                    <Users className="h-5 w-5 text-black" />
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

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-black/10 bg-black/[0.02] p-4">
              <button
                type="button"
                onClick={() => {
                  setShowApplications(false);
                  setSelectedTask(null);
                  setTaskApplications([]);
                }}
                className="
                  cursor-pointer
                  rounded-xl
                  bg-[#020202]
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  transition
                  hover:bg-black/80
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFeeds;
