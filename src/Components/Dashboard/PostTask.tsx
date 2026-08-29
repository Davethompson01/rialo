import { useState } from "react";

import {
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiPlus,
  FiType,
  FiTag,
} from "react-icons/fi";

import Modal from "./PostButton";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20";

const PostTask = () => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [deadline, setDeadline] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getHeaders = () => ({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setReward("");
    setDeadline("");
    setRole("");
    setError("");
  };

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    if (!description.trim()) {
      setError("Task description is required");
      return;
    }

    if (!reward || Number(reward) <= 0) {
      setError("Enter a valid reward");
      return;
    }

    if (!deadline) {
      setError("Deadline is required");
      return;
    }

    if (!role) {
      setError("Please select a role");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/task/create`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          reward: Number(reward),
          Status: "Ongoing",
          deadline,
          role,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create task");
      }

      resetForm();
      setOpen(false);

      // Optional:
      // window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-lg hover:shadow-black/20 active:translate-y-0 active:shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto"
      >
        <FiPlus className="h-4 w-4 stroke-[2.5] transition-transform duration-200 group-hover:rotate-90" />

        <span>Create Task</span>
      </button>

      <Modal
        open={open}
        onClose={() => {
          if (!loading) {
            setOpen(false);
            resetForm();
          }
        }}
        title="Create Task"
        subtitle="Invite contributors to collaborate on your project."
      >
        <form onSubmit={handleCreateTask} className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
              <FiType />
              Task Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="Multi Agent Platform"
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
              <FiFileText />
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder="Describe the task, expectations, and deliverables..."
              disabled={loading}
            />
          </div>

          {/* Reward & Deadline */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
                <FiDollarSign />
                Budget (USDC)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                className={inputClass}
                placeholder="250"
                disabled={loading}
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
                <FiCalendar />
                Deadline
              </label>

              <input
                type="date"
                value={deadline ? deadline.split("T")[0] : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setDeadline(val ? `${val}T23:59:59Z` : "");
                }}
                className={inputClass}
                disabled={loading}
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
              <FiTag />
              Role needed
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`${inputClass} appearance-none cursor-pointer`}
              disabled={loading}
            >
              <option value="">Select a category</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Writer">Writer</option>
              <option value="Moderators">Moderators</option>
              <option value="Artist">Artist</option>
            </select>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <p className="text-sm text-gray-500">
            Contributors will be able to apply for this task once it's
            published.
          </p>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
              className="w-full rounded-xl border border-gray-300 px-5 py-3 transition hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-primary px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PostTask;
