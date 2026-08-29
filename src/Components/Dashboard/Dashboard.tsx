import MixedFeed from "../Feed/MixedFeed";

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-black" />
          <span className="text-xs font-semibold uppercase tracking-widest text-black/40">
            Your workspace
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-950">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Discover tasks and community posts.
        </p>
      </div>

      <MixedFeed />
    </div>
  );
};

export default Dashboard;
