// import  { useState, useEffect } from "react";
// import {
//   Disc as Discord,
//   ShieldCheck,
//   Briefcase,
//   FileText,
//   Heart,
//   MessageSquare,
//   Clock,
//   Coins,
//   Loader2,
//   RefreshCw,
//   AlertCircle,
// } from "lucide-react";

// // --- TS Interfaces matching the API Contract ---
// interface Task {
//   ID: number;
//   UserID: number;
//   Title: string;
//   Description: string;
//   Reward: number;
//   Role: string;
//   Status: string;
//   Deadline: string;
//   CreatedAt: string;
// }

// interface Post {
//   post_id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   description: string;
//   likes: number;
//   comments: number;
//   is_liked: boolean;
//   comment_list: any[];
//   created_at: string;
// }

// import { useSearchParams } from "react-router-dom";

// interface UserProfileData {
//   user_id: number;
//   profile_pics: string;
//   discord_username: string;
//   username: string;
//   role: string;
//   tasks: Task[];
//   posts: Post[];
// }

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: UserProfileData;
// }
// import.meta.env.VITE_API_KEY;

// const getHeaders = () => ({
//   "Content-Type": "application/json",
//   "x-api-key": import.meta.env.VITE_API_KEY,
// });

// export default function UserProfileCard() {
//   const [searchParams] = useSearchParams();

//   const userId = Number(searchParams.get("userId")) || 1;
//   const [profile, setProfile] = useState<UserProfileData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<"tasks" | "posts">("tasks");

//   const fetchUserProfile = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         "https://api.the10ksquadhub.com/v1/user/profile",
//         {
//           method: "POST",
//           credentials: "include",

//           headers: getHeaders(),

//           body: JSON.stringify({ user_id: userId }),
//         },
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result: ApiResponse = await response.json();
//       if (result.success) {
//         setProfile(result.data);
//       } else {
//         throw new Error(result.message || "Failed to load profile.");
//       }
//     } catch (err: any) {
//       setError(err.message || "An unexpected error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, [userId]);

//   // Clean raw PostgreSQL array strings like "{\"{Moderators}\"}"
//   const parseRoles = (rawRole: string): string[] => {
//     if (!rawRole) return [];
//     const cleaned = rawRole.replace(/[{}"\\]/g, "").trim();
//     return cleaned ? cleaned.split(",").map((r) => r.trim()) : [];
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[400px] bg-brand-primary text-brand-dark rounded-2xl border border-brand-dark/10">
//         <Loader2 className="w-8 h-8 animate-spin text-brand-accent mb-3" />
//         <p className="text-sm font-medium text-brand-dark/70">
//           Fetching profile data...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[300px] bg-brand-white text-rose-600 rounded-2xl border border-rose-200 p-6 text-center shadow-sm">
//         <AlertCircle className="w-10 h-10 mb-2 text-rose-500" />
//         <p className="text-base font-semibold mb-1 text-brand-dark">
//           Failed to Load Profile
//         </p>
//         <p className="text-xs text-brand-dark/60 max-w-sm mb-4">{error}</p>
//         <button
//           onClick={fetchUserProfile}
//           className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-brand-white hover:bg-brand-dark/90 text-xs font-medium rounded-lg transition"
//         >
//           <RefreshCw className="w-3.5 h-3.5" /> Try Again
//         </button>
//       </div>
//     );
//   }

//   if (!profile) return null;

//   const roles = parseRoles(profile.role);
//   const totalRewards = profile.tasks.reduce(
//     (acc, curr) => acc + curr.Reward,
//     0,
//   );

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-brand-primary text-text-primary rounded-2xl border border-brand-dark/10 shadow-xl overflow-hidden font-sans">
//       {/* Profile Header Banner using brand-dark */}
//       <div className="relative h-32 bg-brand-dark border-b border-brand-dark/10" />

//       {/* Main Profile Info */}
//       <div className="px-6 pb-6 relative">
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-14 mb-6 gap-4">
//           <div className="flex items-end gap-4">
//             {/* Avatar / Fallback */}
//             <div className="relative w-24 h-24 rounded-2xl bg-brand-white border-4 border-brand-primary shadow-lg overflow-hidden flex items-center justify-center shrink-0">
//               {profile.profile_pics ? (
//                 <img
//                   src={profile.profile_pics}
//                   alt={profile.username}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-brand-accent flex items-center justify-center text-brand-white text-2xl font-bold uppercase">
//                   {profile.username?.slice(0, 2) || "US"}
//                 </div>
//               )}
//             </div>

//             <div className="mb-1">
//               <h1 className="text-2xl font-bold tracking-tight text-brand-dark flex items-center gap-2">
//                 {profile.username}
//               </h1>
//               {profile.discord_username && (
//                 <div className="flex items-center gap-1.5 text-xs text-brand-accent font-medium mt-0.5">
//                   <Discord className="w-3.5 h-3.5" />
//                   <span>@{profile.discord_username}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           <button
//             onClick={fetchUserProfile}
//             className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-brand-white hover:bg-brand-white/80 border border-brand-dark/10 rounded-lg text-xs font-semibold text-brand-dark shadow-sm transition"
//           >
//             <RefreshCw className="w-3.5 h-3.5 text-brand-accent" /> Refresh
//             Profile
//           </button>
//         </div>

//         {/* Roles & Status Badges */}
//         {roles.length > 0 && (
//           <div className="flex flex-wrap items-center gap-2 mb-6">
//             <span className="text-xs text-brand-dark/70 font-medium mr-1 flex items-center gap-1">
//               <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" /> Roles:
//             </span>
//             {roles.map((r, i) => (
//               <span
//                 key={i}
//                 className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-accent/10 text-brand-accent border border-brand-accent/20"
//               >
//                 {r}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Dynamic Overview Metrics */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
//           <div className="bg-brand-white border border-brand-dark/10 p-3.5 rounded-xl shadow-sm">
//             <p className="text-xs text-brand-dark/60 font-medium mb-1 flex items-center gap-1">
//               <Coins className="w-3.5 h-3.5 text-amber-500" /> Potential
//               Earnings
//             </p>
//             <p className="text-xl font-bold text-brand-dark">
//               {totalRewards}{" "}
//               <span className="text-xs font-normal text-brand-dark/60">
//                 PTS
//               </span>
//             </p>
//           </div>

//           <div className="bg-brand-white border border-brand-dark/10 p-3.5 rounded-xl shadow-sm">
//             <p className="text-xs text-brand-dark/60 font-medium mb-1 flex items-center gap-1">
//               <Briefcase className="w-3.5 h-3.5 text-brand-accent" /> Active
//               Tasks
//             </p>
//             <p className="text-xl font-bold text-brand-dark">
//               {profile.tasks.length}
//             </p>
//           </div>

//           <div className="col-span-2 sm:col-span-1 bg-brand-white border border-brand-dark/10 p-3.5 rounded-xl shadow-sm">
//             <p className="text-xs text-brand-dark/60 font-medium mb-1 flex items-center gap-1">
//               <FileText className="w-3.5 h-3.5 text-brand-accent" /> Community
//               Posts
//             </p>
//             <p className="text-xl font-bold text-brand-dark">
//               {profile.posts.length}
//             </p>
//           </div>
//         </div>

//         {/* Tab Selection Navigation */}
//         <div className="flex border-b border-brand-dark/15 mb-4">
//           <button
//             onClick={() => setActiveTab("tasks")}
//             className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition -mb-px ${
//               activeTab === "tasks"
//                 ? "border-brand-accent text-brand-accent"
//                 : "border-transparent text-brand-dark/60 hover:text-brand-dark"
//             }`}
//           >
//             <Briefcase className="w-3.5 h-3.5" /> Assigned Tasks (
//             {profile.tasks.length})
//           </button>
//           <button
//             onClick={() => setActiveTab("posts")}
//             className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition -mb-px ${
//               activeTab === "posts"
//                 ? "border-brand-accent text-brand-accent"
//                 : "border-transparent text-brand-dark/60 hover:text-brand-dark"
//             }`}
//           >
//             <FileText className="w-3.5 h-3.5" /> Created Posts (
//             {profile.posts.length})
//           </button>
//         </div>

//         {/* Tab 1: Tasks Feed */}
//         {activeTab === "tasks" && (
//           <div className="space-y-3">
//             {profile.tasks.length === 0 ? (
//               <p className="text-xs text-brand-dark/50 py-6 text-center">
//                 No assigned tasks found.
//               </p>
//             ) : (
//               profile.tasks.map((task) => (
//                 <div
//                   key={task.ID}
//                   className="bg-brand-white hover:shadow-md border border-brand-dark/10 p-4 rounded-xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
//                 >
//                   <div className="space-y-1">
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs px-2 py-0.5 rounded font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
//                         {task.Status}
//                       </span>
//                       <h3 className="text-sm font-bold text-brand-dark">
//                         {task.Title}
//                       </h3>
//                     </div>
//                     <p className="text-xs text-brand-dark/70 line-clamp-2">
//                       {task.Description}
//                     </p>
//                     <div className="flex items-center gap-3 text-[11px] text-brand-dark/50 pt-1">
//                       <span className="flex items-center gap-1">
//                         <Clock className="w-3 h-3 text-brand-accent" /> Due:{" "}
//                         {new Date(task.Deadline).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-brand-dark/10">
//                     <span className="text-xs text-brand-dark/60">Reward</span>
//                     <span className="text-sm font-bold text-amber-600 flex items-center gap-1">
//                       +{task.Reward} PTS
//                     </span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         {/* Tab 2: Posts Feed */}
//         {activeTab === "posts" && (
//           <div className="space-y-3">
//             {profile.posts.length === 0 ? (
//               <p className="text-xs text-brand-dark/50 py-6 text-center">
//                 No posts found.
//               </p>
//             ) : (
//               profile.posts.map((post) => (
//                 <div
//                   key={post.post_id}
//                   className="bg-brand-white border border-brand-dark/10 p-4 rounded-xl space-y-2 shadow-sm"
//                 >
//                   <h3 className="text-sm font-bold text-brand-dark">
//                     {post.title}
//                   </h3>
//                   <p className="text-xs text-brand-dark/70">
//                     {post.description}
//                   </p>
//                   <div className="flex items-center gap-4 text-xs text-brand-dark/60 pt-2 border-t border-brand-dark/10">
//                     <span
//                       className={`flex items-center gap-1 ${post.is_liked ? "text-rose-500 font-semibold" : ""}`}
//                     >
//                       <Heart className="w-3.5 h-3.5 fill-current" />{" "}
//                       {post.likes}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <MessageSquare className="w-3.5 h-3.5 text-brand-accent" />{" "}
//                       {post.comments}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import {
  Disc as Discord,
  ShieldCheck,
  Briefcase,
  FileText,
  Heart,
  MessageSquare,
  Clock3,
  
  RefreshCw,
  AlertCircle,
  ArrowUpRight,
  Circle,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

// --- API Interfaces ---

interface Task {
  ID: number;
  UserID: number;
  Title: string;
  Description: string;
  Reward: number; // kept for API compatibility, not displayed
  Role: string;
  Status: string;
  Deadline: string;
  CreatedAt: string;
}

interface Post {
  post_id: number;
  user_id: number;
  username: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  is_liked: boolean;
  comment_list: any[];
  created_at: string;
}

interface UserProfileData {
  user_id: number;
  profile_pics: string;
  discord_username: string;
  username: string;
  role: string;
  tasks: Task[];
  posts: Post[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: UserProfileData;
}

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_API_KEY,
});

export default function UserProfileCard() {
  const [searchParams] = useSearchParams();

  const userId = Number(searchParams.get("userId")) || 1;

  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"tasks" | "posts">("tasks");

  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.the10ksquadhub.com/v1/user/profile",
        {
          method: "POST",
          credentials: "include",
          headers: getHeaders(),
          body: JSON.stringify({
            user_id: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to load profile.");
      }

      setProfile(result.data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  // PostgreSQL array cleanup
  const parseRoles = (rawRole: string): string[] => {
    if (!rawRole) return [];

    const cleaned = rawRole.replace(/[{}"\\]/g, "").trim();

    return cleaned
      ? cleaned
          .split(",")
          .map((role) => role.trim())
          .filter(Boolean)
      : [];
  };

  const formatDate = (date: string) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusStyle = (status: string) => {
    const normalized = status?.toLowerCase();

    if (
      normalized === "ongoing" ||
      normalized === "active" ||
      normalized === "in progress"
    ) {
      return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
    }

    if (normalized === "completed" || normalized === "complete") {
      return "bg-blue-500/10 text-blue-700 border-blue-500/20";
    }

    if (
      normalized === "cancelled" ||
      normalized === "canceled" ||
      normalized === "rejected"
    ) {
      return "bg-rose-500/10 text-rose-700 border-rose-500/20";
    }

    return "bg-black/5 text-black/60 border-black/10";
  };

  // -------------------------
  // Loading
  // -------------------------

  if (loading) {
    return (
      <div className="min-h-[500px] w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" />

          <p className="text-sm font-medium text-black/50">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // -------------------------
  // Error
  // -------------------------

  if (error) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-rose-500/10 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-rose-500" />
          </div>

          <h2 className="text-lg font-bold text-black">
            Couldn’t load profile
          </h2>

          <p className="text-sm text-black/50 mt-2">
            {error}
          </p>

          <button
            onClick={fetchUserProfile}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white text-sm font-semibold hover:bg-black/85 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const roles = parseRoles(profile.role);

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-5 lg:px-6 py-4 sm:py-8">
      <div className="overflow-hidden rounded-3xl border border-black/10 bg-[#f4f1e8] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

        {/* ========================================
            COVER
        ======================================== */}

        <div className="relative h-36 sm:h-48 bg-black overflow-hidden">
          {/* subtle decoration */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full border border-white/5" />

          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,white_0,transparent_35%)]" />
          </div>

          {/* Profile ID */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
              <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />

              <span className="text-[10px] sm:text-xs font-medium text-white/70">
                Community member
              </span>
            </div>
          </div>
        </div>

        {/* ========================================
            PROFILE HEADER
        ======================================== */}

        <div className="px-4 sm:px-7 lg:px-9">
          <div className="relative -mt-12 sm:-mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">

              <div className="flex items-end gap-4">

                {/* Avatar */}

                <div className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl border-[5px] border-[#f4f1e8] bg-white overflow-hidden shadow-xl">
                    {profile.profile_pics ? (
                      <img
                        src={profile.profile_pics}
                        alt={profile.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-black text-white text-2xl sm:text-4xl font-bold">
                        {profile.username?.slice(0, 2).toUpperCase() || "US"}
                      </div>
                    )}
                  </div>

                  {/* Online indicator */}

                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-5 h-5 rounded-full bg-emerald-500 border-4 border-[#f4f1e8]" />
                </div>

                {/* Identity */}

                <div className="pb-1 sm:pb-2 min-w-0">

                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-black truncate">
                      {profile.username}
                    </h1>

                    <ShieldCheck className="w-5 h-5 shrink-0 text-black/50" />
                  </div>

                  {profile.discord_username && (
                    <div className="flex items-center gap-1.5 mt-1 text-xs sm:text-sm text-black/50">
                      <Discord className="w-4 h-4" />

                      <span>
                        @{profile.discord_username}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Refresh */}

              <button
                onClick={fetchUserProfile}
                className="self-start sm:self-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-semibold text-black hover:bg-black hover:text-white transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
            </div>

            {/* ========================================
                ROLES
            ======================================== */}

            {roles.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {roles.map((role, index) => (
                  <span
                    key={`${role}-${index}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-black text-white text-[11px] sm:text-xs font-semibold"
                  >
                    {role}
                  </span>
                ))}
              </div>
            )}

            {/* ========================================
                STATS
            ======================================== */}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-7">

              <div className="rounded-2xl bg-white border border-black/8 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-black/40 mb-2">
                  <Briefcase className="w-4 h-4" />

                  <span className="text-[11px] sm:text-xs font-medium">
                    Tasks
                  </span>
                </div>

                <p className="text-2xl sm:text-3xl font-bold text-black">
                  {profile.tasks.length}
                </p>

                <p className="text-[10px] sm:text-xs text-black/40 mt-1">
                  Project activity
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-black/8 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-black/40 mb-2">
                  <FileText className="w-4 h-4" />

                  <span className="text-[11px] sm:text-xs font-medium">
                    Posts
                  </span>
                </div>

                <p className="text-2xl sm:text-3xl font-bold text-black">
                  {profile.posts.length}
                </p>

                <p className="text-[10px] sm:text-xs text-black/40 mt-1">
                  Community activity
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1 rounded-2xl bg-black text-white p-4 sm:p-5">
                <div className="flex items-center gap-2 text-white/50 mb-2">
                  <ShieldCheck className="w-4 h-4" />

                  <span className="text-[11px] sm:text-xs font-medium">
                    Roles
                  </span>
                </div>

                <p className="text-2xl sm:text-3xl font-bold">
                  {roles.length}
                </p>

                <p className="text-[10px] sm:text-xs text-white/40 mt-1">
                  Areas of contribution
                </p>
              </div>
            </div>

            {/* ========================================
                TABS
            ======================================== */}

            <div className="mt-8 border-b border-black/10">
              <div className="flex gap-5 sm:gap-8 overflow-x-auto">

                <button
                  onClick={() => setActiveTab("tasks")}
                  className={`relative flex items-center gap-2 py-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                    activeTab === "tasks"
                      ? "text-black"
                      : "text-black/40 hover:text-black/70"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />

                  Tasks

                  <span className="px-1.5 py-0.5 rounded-md bg-black/5 text-[10px]">
                    {profile.tasks.length}
                  </span>

                  {activeTab === "tasks" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("posts")}
                  className={`relative flex items-center gap-2 py-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                    activeTab === "posts"
                      ? "text-black"
                      : "text-black/40 hover:text-black/70"
                  }`}
                >
                  <FileText className="w-4 h-4" />

                  Posts

                  <span className="px-1.5 py-0.5 rounded-md bg-black/5 text-[10px]">
                    {profile.posts.length}
                  </span>

                  {activeTab === "posts" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                  )}
                </button>

              </div>
            </div>

            {/* ========================================
                CONTENT
            ======================================== */}

            <div className="py-5 sm:py-7">

              {/* ================= TASKS ================= */}

              {activeTab === "tasks" && (
                <div className="space-y-3">

                  {profile.tasks.length === 0 ? (
                    <div className="rounded-2xl bg-white border border-black/8 py-14 text-center">
                      <div className="mx-auto w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-4">
                        <Briefcase className="w-5 h-5 text-black/40" />
                      </div>

                      <h3 className="text-sm font-bold text-black">
                        No tasks yet
                      </h3>

                      <p className="text-xs text-black/40 mt-1">
                        This member hasn't been assigned any tasks.
                      </p>
                    </div>
                  ) : (
                    profile.tasks.map((task) => (
                      <div
                        key={task.ID}
                        className="group rounded-2xl bg-white border border-black/8 p-4 sm:p-5 hover:border-black/20 hover:shadow-lg hover:-translate-y-[1px] transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2 mb-2">

                              <span
                                className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(
                                  task.Status
                                )}`}
                              >
                                {task.Status}
                              </span>

                              {task.Role && (
                                <span className="text-[10px] sm:text-xs text-black/40">
                                  {task.Role}
                                </span>
                              )}
                            </div>

                            <h3 className="text-sm sm:text-base font-bold text-black group-hover:underline underline-offset-4">
                              {task.Title}
                            </h3>

                            <p className="mt-1.5 text-xs sm:text-sm text-black/50 leading-relaxed line-clamp-2 max-w-2xl">
                              {task.Description}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 mt-3 text-[10px] sm:text-xs text-black/40">

                              <span className="flex items-center gap-1.5">
                                <Clock3 className="w-3.5 h-3.5" />

                                Due {formatDate(task.Deadline)}
                              </span>

                              <span className="w-1 h-1 rounded-full bg-black/20" />

                              <span>
                                Added {formatDate(task.CreatedAt)}
                              </span>
                            </div>
                          </div>

                          <div className="hidden sm:flex shrink-0 w-9 h-9 rounded-full bg-black/5 items-center justify-center group-hover:bg-black group-hover:text-white transition">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ================= POSTS ================= */}

              {activeTab === "posts" && (
                <div className="space-y-3">

                  {profile.posts.length === 0 ? (
                    <div className="rounded-2xl bg-white border border-black/8 py-14 text-center">
                      <div className="mx-auto w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-4">
                        <FileText className="w-5 h-5 text-black/40" />
                      </div>

                      <h3 className="text-sm font-bold text-black">
                        No posts yet
                      </h3>

                      <p className="text-xs text-black/40 mt-1">
                        Nothing has been shared by this member yet.
                      </p>
                    </div>
                  ) : (
                    profile.posts.map((post) => (
                      <article
                        key={post.post_id}
                        className="group rounded-2xl bg-white border border-black/8 p-4 sm:p-5 hover:border-black/20 hover:shadow-lg transition-all"
                      >
                        {/* Post header */}

                        <div className="flex items-start justify-between gap-4">

                          <div className="min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-black leading-snug group-hover:underline underline-offset-4">
                              {post.title}
                            </h3>

                            <p className="text-[10px] sm:text-xs text-black/35 mt-1">
                              {formatDate(post.created_at)}
                            </p>
                          </div>

                          <ArrowUpRight className="w-4 h-4 text-black/20 group-hover:text-black transition shrink-0" />
                        </div>

                        {/* Post body */}

                        <p className="mt-3 text-xs sm:text-sm text-black/55 leading-relaxed">
                          {post.description}
                        </p>

                        {/* Engagement */}

                        <div className="mt-5 pt-3 border-t border-black/8 flex items-center gap-5">

                          <div
                            className={`flex items-center gap-1.5 text-xs ${
                              post.is_liked
                                ? "text-rose-500 font-semibold"
                                : "text-black/40"
                            }`}
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                post.is_liked ? "fill-current" : ""
                              }`}
                            />

                            {post.likes}
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-black/40">
                            <MessageSquare className="w-4 h-4" />

                            {post.comments}
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom spacing */}

        <div className="h-3 sm:h-5" />
      </div>
    </div>
  );
}
