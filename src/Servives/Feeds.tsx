import type { DashboardFeedItem } from "../Types/feeds";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

 const getHeaders = () => ({
   "Content-Type": "application/json",
   "x-api-key": API_KEY,
 });

export const getDashboardFeed = async (): Promise<DashboardFeedItem[]> => {
  const response = await fetch(`${API_URL}/dashboard/feed`, {
    method: "GET",
    credentials: "include",
    headers: getHeaders(),
  });

  const data = await response.json();
  console.log(data)

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to load dashboard feed");
  }

  return data.data || [];
};
