import MixedFeed from "../Feed/MixedFeed";

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        <p className="text-sm text-gray-500 mt-1">
          Discover tasks and community posts.
        </p>
      </div>

      <MixedFeed />
    </div>
  );
};

export default Dashboard;
