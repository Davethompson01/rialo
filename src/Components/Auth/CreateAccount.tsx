import railologo from "../../assets/rialologo.png";
import { FaDiscord } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
import { FiBriefcase } from "react-icons/fi";
import { FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //   useEffect = () => {
  //     navigate("/login");
  //   };

  const [discordUsername, setDiscordUsername] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateAccount = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify({
            DiscordUserName: discordUsername,
            Username: username,
            role: role,
            password: password,
          }),
        },
      );
      const result = await response.json();
      if (!result.success) {
        setError(result.message);
        return;
      }
      // Account successfully created
      navigate("/login");
    } catch (error) {
      console.error("Create account error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-brand-primary lg:bg-brand-white flex flex-col lg:flex-row items-center justify-center gap-10 p-6">
      {/* <div className="w-full lg:w-[45%] max-w-lg text-center lg:text-left"> */}
      <div className="w-full lg:w-[45%] max-w-lg bg-white rounded-3xl p-8 shadow-xl lg:bg-transparent lg:shadow-none lg:p-0 text-center lg:text-left">
        <h1 className="text-4xl font-medium text-text-primary">Connecto</h1>

        <p className=" text-text-primary/50 hidden lg:block">
          Your best assistant for connecting with others.
        </p>

        <form className="mt-10 space-y-7" onSubmit={handleCreateAccount}>
          {/* Discord */}
          <div className="relative">
            <FaDiscord className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Discord username"
              value={discordUsername}
              onChange={(e) => setDiscordUsername(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-brand-primary"
            />
          </div>
          {/* Username */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-brand-primary"
            />
          </div>
          {/* Role */}
          <div className="relative">
            <MdWorkOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none appearance-none"
            >
              <option value="">Select your role</option>{" "}
              <option value="Developer">Developer</option>{" "}
              <option value="Designer">Designer</option>{" "}
              <option value="Writer">Writer</option>{" "}
              <option value="Moderators">Moderators</option>{" "}
              <option value="Artist">Artist</option>
            </select>
          </div>
          {/* Password */}
          <div className="relative">
            <MdOutlinePassword className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border py-3 pl-12 pr-12"
              placeholder="Enter password"
            />

            <FaEye
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
            />
          </div>
          {error && <p className="text-red-500 text-sm"> {error} </p>}
          <button
            type="submit"
            disabled={loading}
            className=" w-full py-3 rounded-xl bg-brand-primary text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 "
          >
            {" "}
            {loading ? "Creating Account..." : "Create Account"}{" "}
          </button>
          
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?
          <span
            className="ml-1 font-semibold text-brand-primary cursor-pointer hover:underline"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </span>
        </p>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex w-[45%] h-[90vh] rounded-[40px] bg-brand-primary text-text-primary p-10 flex-col justify-center">
        <img src={railologo} alt="Rialo" className="w-20 h-20 mb-8" />

        <h2 className="text-4xl font-bold">
          Welcome to <span className="text-brand-secondary">Connecto</span>
        </h2>

        <p className="mt-4 text-lg text-text-primary/80">
          Connect with builders, contributors, and communities on Rialo.
        </p>

        <div className="space-y-5 mt-10">
          <div className="flex items-center gap-3">
            <FiUsers className="text-2xl text-brand-secondary" />
            <span>Connect with talented contributors.</span>
          </div>

          <div className="flex items-center gap-3">
            <FiBriefcase className="text-2xl text-brand-secondary" />
            <span>Work on meaningful community projects.</span>
          </div>

          <div className="flex items-center gap-3">
            <FiAward className="text-2xl text-brand-secondary" />
            <span>Build your reputation over time.</span>
          </div>

          <div className="flex items-center gap-3">
            <FiZap className="text-2xl text-brand-secondary" />
            <span>Earn rewards for your contributions.</span>
          </div>
        </div>
        {/* <p className="text-center mt-6 text-sm text-text-primary">
          Already have an account?
          <span className="text-text-primary font-semibold cursor-pointer ml-1">
            Sign in
          </span>
        </p> */}
      </div>
    </div>
  );
};

export default CreateAccount;
