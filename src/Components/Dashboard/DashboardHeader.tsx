import { FiBell } from "react-icons/fi";
import logo from "../../assets/rialologo.png";

const DashboardHeader = () => {
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <header className="flex items-center justify-between mb-8">
      {/* Left */}
      <div>
        <p className="text-sm text-gray-500">Dashboard</p>

        <h1 className="text-3xl font-bold text-brand-dark">
          {greeting}, David 👋
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative rounded-xl border border-gray-200 p-3 hover:bg-gray-50 transition">
          <FiBell size={20} />

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <img src={logo} alt="" className="h-10 w-10 rounded-full" />

          <div>
            <p className="font-semibold">David</p>
            <p className="text-xs text-gray-500">Community Writer</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
