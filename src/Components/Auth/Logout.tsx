import { FaSignOutAlt } from "react-icons/fa";
import { logoutUser } from "../../Servives/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await logoutUser();

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
    >
      <FaSignOutAlt size={14} />

      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
