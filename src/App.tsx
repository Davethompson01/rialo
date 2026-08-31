// import { useEffect, useState } from "react";
// import { Route, Routes } from "react-router-dom";

// import { CreateAccountPage } from "./Pages/Auth/CreateAccount";
// import { LoginPage } from "./Pages/Auth/Login";

// import { TaskLayout } from "./Components/Task/TaskLayout";
// import { DashboardNav } from "./Components/Dashboard/DashboardNav";

// import Dashboard from "./Components/Dashboard/Dashboard";
// import FeedsCard from "./Components/Task/FeedsCard";
// import TaskFeeds from "./Components/Task/Task";

// import NegotiationChat from "./Components/Message/negotiate";
// import OffersList from "./Components/Message/ListChat";
// import LandingPage from "./Pages/LandingPage";

// const API_URL = import.meta.env.VITE_API_URL;
// const API_KEY = import.meta.env.VITE_API_KEY;

// export default function App() {
//   const [currentUserId, setCurrentUserId] = useState<number | null>(null);

//   const getHeaders = () => ({
//     "Content-Type": "application/json",
//     "x-api-key": API_KEY,
//   });
//   const fetchCurrentUser = async () => {
//     const response = await fetch(`${API_URL}/auth/me`, {
//       method: "GET",
//       credentials: "include",
//       headers: getHeaders(),
//     });

//     const text = await response.text();

//     let result;

//     try {
//       result = JSON.parse(text);
//     } catch {
//       throw new Error(text || "Invalid server response");
//     }

//     if (!response.ok || !result.success) {
//       throw new Error(result.message || "Unable to get current user");
//     }

//     setCurrentUserId(result.data.id);
//     console.log(result)

//     return result.data.id;
//   };

//   useEffect(() => {
//     fetchCurrentUser();
//   }, []);

//   return (
//     <Routes>
//       <Route path="/signup" element={<CreateAccountPage />} />

//       <Route path="/" element={<LandingPage />} />

//       <Route path="/login" element={<LoginPage />} />

//       <Route element={<TaskLayout />}>
//         <Route element={<DashboardNav />}>
//           <Route path="/dashboard" element={<Dashboard />} />

//           <Route path="/feed" element={<FeedsCard />} />

//           <Route path="/task" element={<TaskFeeds />} />

//           <Route
//             path="/negotiate/:conversationId"
//             element={<NegotiationChat />}
//           />

//           <Route
//             path="/negotiate"
//             element={
//               currentUserId !== null ? (
//                 <OffersList currentUserId={currentUserId} />
//               ) : (
//                 <div>Loading...</div>
//               )
//             }
//           />
//         </Route>
//       </Route>
//     </Routes>
//   );
// }

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { CreateAccountPage } from "./Pages/Auth/CreateAccount";
import { LoginPage } from "./Pages/Auth/Login";

import { TaskLayout } from "./Components/Task/TaskLayout";
import { DashboardNav } from "./Components/Dashboard/DashboardNav";

import Dashboard from "./Components/Dashboard/Dashboard";
import FeedsCard from "./Components/Task/FeedsCard";
import TaskFeeds from "./Components/Task/Task";

import NegotiationChat from "./Components/Message/negotiate";
import OffersList from "./Components/Message/ListChat";
import LandingPage from "./Pages/LandingPage";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const getHeaders = () => ({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  });

  const fetchCurrentUser = async () => {
    try {
      setAuthLoading(true);
      setAuthError(null);

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

      const userId = Number(result.data.id);

      if (!Number.isInteger(userId) || userId <= 0) {
        throw new Error("Invalid user ID returned by server");
      }

      setCurrentUserId(userId);

      console.log("Current user:", result.data);
    } catch (error) {
      console.error("Failed to fetch current user:", error);

      setCurrentUserId(null);

      setAuthError(
        error instanceof Error ? error.message : "Authentication failed",
      );
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Routes>
      <Route path="/signup" element={<CreateAccountPage />} />

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route element={<TaskLayout />}>
        <Route element={<DashboardNav />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/feed" element={<FeedsCard />} />

          <Route path="/task" element={<TaskFeeds />} />

          <Route
            path="/negotiate/:conversationId"
            element={<NegotiationChat />}
          />

          <Route
            path="/negotiate"
            element={
              authLoading ? (
                <div>Loading...</div>
              ) : authError ? (
                <div>Failed to load user: {authError}</div>
              ) : currentUserId !== null ? (
                <OffersList currentUserId={currentUserId} />
              ) : (
                <div>You are not authenticated.</div>
              )
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}