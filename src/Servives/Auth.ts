const API_URL = import.meta.env.VITE_API_URL;

export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }

  return response.json();
};
