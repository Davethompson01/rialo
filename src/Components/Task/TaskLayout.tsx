// import { Outlet } from "react-router-dom";

// export const TaskLayout = () => {
//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         <Outlet />
//       </main>

//       {/* Right Panel */}
//       <aside className="hidden xl:flex w-80 flex-col border-l border-gray-200 bg-[#F8F5EE] p-6">
//         <h2 className="text-xl font-semibold text-brand-dark">Task Details</h2>

//         <p className="mt-2 text-sm text-gray-500">
//           Select a task from the feed to view its details.
//         </p>

//         <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
//           <h3 className="font-semibold text-brand-dark">No task selected</h3>

//           <p className="mt-2 text-sm text-gray-500">
//             Click on a task card to see the description, reward, applicants,
//             deadline, and actions.
//           </p>
//         </div>
//       </aside>
//     </div>
//   );
// };

import { useState } from "react";
import { Outlet,  } from "react-router-dom";

import {
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiTrash2,
} from "react-icons/fi";
// Export task context type for child components rendered in <Outlet />
export type TaskContextType = {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  role: string;
  status: "OPEN" | "CLOSED";
  createdAt: string;
  deadline: string;
  applications: number;
  isOwner: boolean;
  hasApplied?: boolean;
};

export const TaskLayout = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Core navigation items matching DashboardNav


  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* 1. Dashboard Navigation Sidebar */}
    

      {/* 2. Main Workspace Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-50/50">
        <Outlet
          context={{ selectedTask, setSelectedTask } satisfies TaskContextType}
        />
      </main>

      {/* 3. Right Details Drawer */}
      <aside className="hidden xl:flex w-80 flex-col border-l border-gray-200 bg-[#F8F5EE] p-6 shrink-0 overflow-y-auto">
        <h2 className="text-lg font-bold text-brand-dark">Task Details</h2>

        {selectedTask ? (
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    selectedTask.status === "OPEN"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedTask.status}
                </span>
                <span className="text-xs text-gray-400">
                  #{selectedTask.id}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  {selectedTask.title}
                </h3>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  {selectedTask.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <FiUsers size={14} /> Role
                  </span>
                  <span className="font-semibold text-gray-800">
                    {selectedTask.role}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <FiClock size={14} /> Deadline
                  </span>
                  <span className="font-medium text-gray-700">
                    {selectedTask.deadline}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <FiUsers size={14} /> Applications
                  </span>
                  <span className="font-semibold text-gray-800">
                    {selectedTask.applications}
                  </span>
                </div>
              </div>

              {/* Detail Panel Actions */}
              <div className="pt-2">
                {selectedTask.isOwner ? (
                  <button
                    onClick={() => DeleteTask({ taskId: selectedTask.id })}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-300 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <FiTrash2 size={14} />
                    Delete Task
                  </button>
                ) : selectedTask.hasApplied ? (
                  <button
                    onClick={() =>
                      CancelApplications({ taskId: selectedTask.id })
                    }
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-amber-400 bg-amber-50 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-100"
                  >
                    <FiXCircle size={14} />
                    Withdraw Application
                  </button>
                ) : (
                  <button
                    onClick={() => ApplyForTasks({ taskId: selectedTask.id })}
                    disabled={selectedTask.status === "CLOSED"}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-2 text-xs font-semibold text-white hover:bg-gray-800 disabled:bg-gray-300"
                  >
                    <FiCheckCircle size={14} />
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-brand-dark text-sm">
              No task selected
            </h3>
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              Click on any task card in the feed to inspect full metadata,
              requirements, and application triggers.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};

// Handler Stubs
export const ApplyForTasks = ({ taskId }: { taskId: number }) => {
  console.log("Applied to task:", taskId);
};

export const AcceptApplicants = ({
  applicationId,
}: {
  applicationId: number;
}) => {
  console.log("Accepted applicant:", applicationId);
};

export const RejectApplicants = ({
  applicationId,
}: {
  applicationId: number;
}) => {
  console.log("Rejected applicant:", applicationId);
};

export const GetApplications = ({ taskId }: { taskId: number }) => {
  console.log("Fetching applications for:", taskId);
};

export const CancelApplications = ({ taskId }: { taskId: number }) => {
  console.log("Cancelled application for task:", taskId);
};

export const DeleteTask = ({ taskId }: { taskId: number }) => {
  console.log("Deleted task:", taskId);
};