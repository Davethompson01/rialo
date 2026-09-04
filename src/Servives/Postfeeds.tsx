import type { FeedPost, CommentResponse } from "../Types/feeds";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});

export const getPostFeed = async (
  page = 1,
  limit = 20,
): Promise<FeedPost[]> => {
  if (limit < 1 || limit > 100) {
    throw new Error("Limit must be between 1 and 100");
  }

  if (page < 1) {
    throw new Error("Page must be at least 1");
  }

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(`${API_URL}/posts?${params.toString()}`, {
    method: "GET",
    credentials: "include",
    headers: getHeaders(),
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to load posts");
  }

  return data.data;
};

export const likePost = async (postID: number) => {
  const response = await fetch(`${API_URL}/posts/${postID}/like`, {
    method: "POST",
    credentials: "include",
    headers: getHeaders(),
  });
  console.log("LIKE POST ID:", postID);
  console.log("LIKE URL:", `${API_URL}/posts/${postID}/like`);

  const data = await response.json();
  console.log("LIKE RESPONSE:", response.status, data);

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to like post");
  }

  return data;
};

export const unlikePost = async (postID: number) => {
  const response = await fetch(`${API_URL}/posts/${postID}/like`, {
    method: "DELETE",
    credentials: "include",
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to unlike post");
  }

  return data;
};

export const getPostComments = async (
  postID: number,
): Promise<CommentResponse[]> => {
  const response = await fetch(`${API_URL}/comments/${postID}/comments`, {
    method: "GET",
    credentials: "include",
    headers: getHeaders(),
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to load comments");
  }

  return data.data || [];
};

export const createComment = async (postID: number, comment: string) => {
  const response = await fetch(`${API_URL}/posts/${postID}/comments`, {
    method: "POST",
    credentials: "include",
    headers: getHeaders(),
    body: JSON.stringify({
      comment,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to create comment");
  }

  return data;
};
