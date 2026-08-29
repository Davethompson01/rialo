// import React from "react";
// import PostTask from "./PostTask";
// import PostSocialFeed from "./PostSocialFeed";
// import logo from "../../assets/rialologo.png";
// import {
//   MdDashboard,
//   MdOutlineWorkOutline,
//   MdOutlineBookmarkBorder,
// } from "react-icons/md";
// import { FaTasks } from "react-icons/fa";
// import { SlFeed } from "react-icons/sl";
// import { FiMessageSquare } from "react-icons/fi";
// import { NavLink, Outlet } from "react-router-dom";

// export const DashboardNav = () => {
//   const primaryNavItems = [
//     { label: "Dashboard", Icon: <MdDashboard size={20} />, Link: "/" },
//     { label: "Task", Icon: <FaTasks size={20} />, Link: "/task" },
//     { label: "Feeds", Icon: <SlFeed size={20} />, Link: "/feed" },
//     {
//       label: "Negotiate",
//       Icon: <FiMessageSquare size={20} />,
//       Link: "/negotiate",
//     },

//   ];

//   const taskSubNavItems = [
//     {
//       label: "All Tasks",
//       Icon: <MdOutlineWorkOutline size={18} />,
//       Link: "/task",
//     },
//     {
//       label: "My Applications",
//       Icon: <MdOutlineBookmarkBorder size={18} />,
//       Link: "/task/my-applications",
//     },
//   ];

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Desktop Sidebar Navigation */}
//       <aside className="hidden md:flex h-screen w-64 flex-col bg-brand-primary border-r border-gray-200 shrink-0">
//         <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200/50">
//           <img src={logo} className="w-8 h-8" alt="Connecto" />
//           <div>
//             <h2 className="font-bold text-lg text-gray-900 leading-tight">
//               Connecto
//             </h2>
//             <p className="text-xs text-gray-500">Community Hub</p>
//           </div>
//         </div>

//         <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
//           {/* Main App Routes */}
//           <div className="space-y-1">
//             <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
//               Menu
//             </p>
//             {primaryNavItems.map(({ label, Icon, Link }) => (
//               <NavLink
//                 key={label}
//                 to={Link}
//                 end={Link === "/"}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     isActive
//                       ? "bg-brand-dark text-white shadow-sm"
//                       : "text-gray-600 hover:bg-white/70 hover:text-brand-dark"
//                   }`
//                 }
//               >
//                 <span>{Icon}</span>
//                 <span>{label}</span>
//               </NavLink>
//             ))}
//           </div>

//           {/* Task Quick Filters */}
//           <div className="space-y-1 pt-2 border-t border-gray-200/60">
//             <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
//               Task Views
//             </p>
//             {taskSubNavItems.map(({ label, Icon, Link }) => (
//               <NavLink
//                 key={label}
//                 to={Link}
//                 end={Link === "/task"}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
//                     isActive
//                       ? "bg-gray-200/80 text-gray-900"
//                       : "text-gray-500 hover:bg-white/50 hover:text-gray-800"
//                   }`
//                 }
//               >
//                 <span>{Icon}</span>
//                 <span>{label}</span>
//               </NavLink>
//             ))}
//           </div>
//         </nav>

//         {/* Action Widgets */}
//         <div className="p-4 border-t border-gray-200/60 space-y-3">
//           <PostSocialFeed />
//           <PostTask />
//         </div>
//       </aside>

//       {/* Main Content View */}
//       <main className="flex-1 bg-gray-50 overflow-y-auto pb-16 md:pb-0">
//         <Outlet />
//       </main>

//       {/* Mobile Bottom Navigation */}
//       <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-white border-t border-gray-200 py-2 px-1 shadow-lg">
//         {primaryNavItems.map(({ label, Icon, Link }) => (
//           <NavLink
//             key={label}
//             to={Link}
//             end={Link === "/"}
//             className={({ isActive }) =>
//               `flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors ${
//                 isActive
//                   ? "text-brand-dark font-semibold"
//                   : "text-gray-500 hover:text-gray-900"
//               }`
//             }
//           >
//             {({ isActive }) => (
//               <>
//                 <div
//                   className={`p-1 rounded-full transition-colors ${
//                     isActive ? "bg-gray-100" : ""
//                   }`}
//                 >
//                   {Icon}
//                 </div>
//                 <span className="mt-0.5 truncate max-w-full">{label}</span>
//               </>
//             )}
//           </NavLink>
//         ))}

//       </nav>
//     </div>
//   );
// };

import  { useState } from "react";
import PostTask from "./PostTask";
import PostSocialFeed from "./PostSocialFeed";
import logo from "../../assets/rialologo.png";
import {
  MdDashboard,
  MdOutlineWorkOutline,
  MdOutlineBookmarkBorder,
  MdAdd,
  MdClose,
} from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { SlFeed } from "react-icons/sl";
import { FiMessageSquare } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";

export const DashboardNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const primaryNavItems = [
    { label: "Dashboard", Icon: <MdDashboard size={20} />, Link: "/" },
    { label: "Task", Icon: <FaTasks size={20} />, Link: "/task" },
    { label: "Feeds", Icon: <SlFeed size={20} />, Link: "/feed" },
    {
      label: "Negotiate",
      Icon: <FiMessageSquare size={20} />,
      Link: "/negotiate",
    },
  ];

  const taskSubNavItems = [
    {
      label: "All Tasks",
      Icon: <MdOutlineWorkOutline size={18} />,
      Link: "/task",
    },
    {
      label: "My Applications",
      Icon: <MdOutlineBookmarkBorder size={18} />,
      Link: "/task/my-applications",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex h-screen w-64 flex-col bg-brand-primary border-r border-gray-200 shrink-0">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200/50">
          <img src={logo} className="w-8 h-8" alt="Connecto" />
          <div>
            <h2 className="font-bold text-lg text-gray-900 leading-tight">
              Connecto
            </h2>
            <p className="text-xs text-gray-500">Community Hub</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
          {/* Main App Routes */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Menu
            </p>
            {primaryNavItems.map(({ label, Icon, Link }) => (
              <NavLink
                key={label}
                to={Link}
                end={Link === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-dark text-white shadow-sm"
                      : "text-gray-600 hover:bg-white/70 hover:text-brand-dark"
                  }`
                }
              >
                <span>{Icon}</span>
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Task Quick Filters */}
          <div className="space-y-1 pt-2 border-t border-gray-200/60">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Task Views
            </p>
            {taskSubNavItems.map(({ label, Icon, Link }) => (
              <NavLink
                key={label}
                to={Link}
                end={Link === "/task"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-gray-200/80 text-gray-900"
                      : "text-gray-500 hover:bg-white/50 hover:text-gray-800"
                  }`
                }
              >
                <span>{Icon}</span>
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Action Widgets (Desktop) */}
        <div className="p-4 border-t border-gray-200/60 space-y-3">
          <PostSocialFeed />
          <PostTask />
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 bg-gray-50 overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Floating Action Widgets */}
      <div className="md:hidden fixed bottom-20 right-4 z-50 flex flex-col items-end space-y-2">
        {isMobileMenuOpen && (
          <div className="flex flex-col items-end space-y-2 mb-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <PostSocialFeed />
            <PostTask />
          </div>
        )}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-brand-dark text-white p-3.5 rounded-full shadow-xl flex items-center justify-center focus:outline-none"
          aria-label="Create New"
        >
          {isMobileMenuOpen ? <MdClose size={24} /> : <MdAdd size={24} />}
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-white border-t border-gray-200 py-2 px-1 shadow-lg">
        {primaryNavItems.map(({ label, Icon, Link }) => (
          <NavLink
            key={label}
            to={Link}
            end={Link === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors ${
                isActive
                  ? "text-brand-dark font-semibold"
                  : "text-gray-500 hover:text-gray-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-1 rounded-full transition-colors ${
                    isActive ? "bg-gray-100" : ""
                  }`}
                >
                  {Icon}
                </div>
                <span className="mt-0.5 truncate max-w-full">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};