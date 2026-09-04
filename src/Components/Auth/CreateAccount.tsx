// import railologo from "../../assets/rialologo.png";
// import { FaDiscord } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
// import { MdOutlinePassword } from "react-icons/md";
// import { MdWorkOutline } from "react-icons/md";
// import { FiUsers } from "react-icons/fi";
// import { FiAward } from "react-icons/fi";
// import { FiBriefcase } from "react-icons/fi";
// import { FiZap } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { FaEye } from "react-icons/fa";

// const CreateAccount = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   //   useEffect = () => {
//   //     navigate("/login");
//   //   };

//   const [discordUsername, setDiscordUsername] = useState("");
//   const [username, setUsername] = useState("");
//   const [role, setRole] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleCreateAccount = async (e: any) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/auth/createuser`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "x-api-key": import.meta.env.VITE_API_KEY,
//           },
//           body: JSON.stringify({
//             DiscordUserName: discordUsername,
//             Username: username,
//             role: role,
//             password: password,
//           }),
//         },
//       );
//       const result = await response.json();
//       if (!result.success) {
//         setError(result.message);
//         return;
//       }
//       // Account successfully created
//       navigate("/login");
//     } catch (error) {
//       console.error("Create account error:", error);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen  bg-brand-primary lg:bg-brand-white flex flex-col lg:flex-row items-center justify-center gap-10 p-6">
//       {/* <div className="w-full lg:w-[45%] max-w-lg text-center lg:text-left"> */}
//       <div className="w-full lg:w-[45%] max-w-lg bg-white rounded-3xl p-8 shadow-xl lg:bg-transparent lg:shadow-none lg:p-0 text-center lg:text-left">
//         <h1 className="text-4xl font-medium text-text-primary">Connecto</h1>

//         <p className=" text-text-primary/50 hidden lg:block">
//           Your best assistant for connecting with others.
//         </p>

//         <form className="mt-10 space-y-7" onSubmit={handleCreateAccount}>
//           {/* Discord */}
//           <div className="relative">
//             <FaDiscord className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

//             <input
//               type="text"
//               placeholder="Discord username"
//               value={discordUsername}
//               onChange={(e) => setDiscordUsername(e.target.value)}
//               className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-brand-primary"
//             />
//           </div>
//           {/* Username */}
//           <div className="relative">
//             <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
//             <input
//               type="text"
//               placeholder="Choose a username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-brand-primary"
//             />
//           </div>
//           {/* Role */}
//           <div className="relative">
//             <MdWorkOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none appearance-none"
//             >
//               <option value="">Select your role</option>{" "}
//               <option value="Developer">Developer</option>{" "}
//               <option value="Designer">Graphic Designer</option>{" "}
//               <option value="Writer">Writer</option>{" "}
//               <option value="Moderators">Moderator</option>{" "}
//               <option value="Artist">Artist</option>
//             </select>
//           </div>
//           {/* Password */}
//           <div className="relative">
//             <MdOutlinePassword className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full rounded-xl border py-3 pl-12 pr-12"
//               placeholder="Enter password"
//             />

//             <FaEye
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm"> {error} </p>}
//           <button
//             type="submit"
//             disabled={loading}
//             className=" w-full py-3 rounded-xl bg-brand-primary text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 "
//           >
//             {" "}
//             {loading ? "Creating Account..." : "Create Account"}{" "}
//           </button>
//         </form>
//         <p className="mt-6 text-center text-sm text-gray-500">
//           Already have an account?
//           <span
//             className="ml-1 font-semibold text-brand-primary cursor-pointer hover:underline"
//             onClick={() => {
//               navigate("/login");
//             }}
//           >
//             Sign in
//           </span>
//         </p>
//       </div>

//       {/* Right Side */}
//       <div className="hidden lg:flex w-[45%] h-[90vh] rounded-[40px] bg-brand-primary text-text-primary p-10 flex-col justify-center">
//         <img src={railologo} alt="Rialo" className="w-20 h-20 mb-8" />

//         <h2 className="text-4xl font-bold">
//           Welcome to <span className="text-brand-secondary">Connecto</span>
//         </h2>

//         <p className="mt-4 text-lg text-text-primary/80">
//           Connect with builders, contributors, and communities on Connecto.
//         </p>

//         <div className="space-y-5 mt-10">
//           <div className="flex items-center gap-3">
//             <FiUsers className="text-2xl text-brand-secondary" />
//             <span>Connect with talented contributors.</span>
//           </div>

//           <div className="flex items-center gap-3">
//             <FiBriefcase className="text-2xl text-brand-secondary" />
//             <span>Work on meaningful community projects.</span>
//           </div>

//           <div className="flex items-center gap-3">
//             <FiAward className="text-2xl text-brand-secondary" />
//             <span>Build your reputation over time.</span>
//           </div>

//           <div className="flex items-center gap-3">
//             <FiZap className="text-2xl text-brand-secondary" />
//             <span>Earn rewards for your contributions.</span>
//           </div>
//         </div>
//         {/* <p className="text-center mt-6 text-sm text-text-primary">
//           Already have an account?
//           <span className="text-text-primary font-semibold cursor-pointer ml-1">
//             Sign in
//           </span>
//         </p> */}
//       </div>
//     </div>
//   );
// };

// export default CreateAccount;

import railologo from "../../assets/rialologo.png";
import { FaDiscord, FaUser, FaEye } from "react-icons/fa";
import { MdOutlinePassword, MdWorkOutline } from "react-icons/md";
import {
  FiUsers,
  FiAward,
  FiBriefcase,
  FiZap,
  FiX,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const suggestedRoles = [
  "Developer",
  "Designer",
  "Writer",
  "Moderator",
  "Artist",
  "Community Manager",
  "Product Manager",
  "Marketing",
];

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [discordUsername, setDiscordUsername] = useState("");
  const [username, setUsername] = useState("");

  // Multiple roles
  const [roles, setRoles] = useState<string[]>([]);

  // Custom role input
  const [customRole, setCustomRole] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addRole = (role: string) => {
    const cleanRole = role.trim();

    if (!cleanRole) return;

    // Don't add duplicate roles
    if (roles.some((r) => r.toLowerCase() === cleanRole.toLowerCase())) {
      return;
    }

    setRoles((prev) => [...prev, cleanRole]);
  };

  const removeRole = (roleToRemove: string) => {
    setRoles((prev) => prev.filter((role) => role !== roleToRemove));
  };

  const addCustomRole = () => {
    addRole(customRole);
    setCustomRole("");
  };

  const handleCustomRoleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomRole();
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (roles.length === 0) {
      setError("Please select or add at least one role.");
      return;
    }

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
            role: roles,
            password: password,
          }),
        },
      );

      const result = await response.json();

      if (!result.success) {
        setError(result.message);
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("Create account error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary lg:bg-brand-white flex flex-col lg:flex-row items-center justify-center gap-10 p-6">
      {/* LEFT */}
      <div className="w-full lg:w-[45%] max-w-lg bg-white rounded-3xl p-8 shadow-xl lg:bg-transparent lg:shadow-none lg:p-0 text-center lg:text-left">
        <h1 className="text-4xl font-medium text-text-primary">Connecto</h1>

        <p className="text-text-primary/50 hidden lg:block">
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

          {/* ROLES */}
          <div className="text-left">
            <div className="relative">
              <MdWorkOutline className="absolute left-4 top-4 text-gray-400 text-lg" />

              <input
                type="text"
                placeholder="Add your role..."
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                onKeyDown={handleCustomRoleKeyDown}
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none focus:border-brand-primary"
              />

              <button
                type="button"
                onClick={addCustomRole}
                disabled={!customRole.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-black disabled:opacity-30"
              >
                <FiPlus />
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Add multiple roles. You can create your own role.
            </p>

            {/* Suggested roles */}
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-gray-400">
                Suggested roles
              </p>

              <div className="flex flex-wrap gap-2">
                {suggestedRoles.map((role) => {
                  const selected = roles.some(
                    (r) => r.toLowerCase() === role.toLowerCase(),
                  );

                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        if (selected) {
                          const existing = roles.find(
                            (r) => r.toLowerCase() === role.toLowerCase(),
                          );

                          if (existing) {
                            removeRole(existing);
                          }
                        } else {
                          addRole(role);
                        }
                      }}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        selected
                          ? "border-brand-primary bg-brand-primary text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected roles */}
            {roles.length > 0 && (
              <div className="mt-5">
                <p className="mb-2 text-xs font-medium text-gray-400">
                  Your roles
                </p>

                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <div
                      key={role}
                      className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
                    >
                      <span>{role}</span>

                      <button
                        type="button"
                        onClick={() => removeRole(role)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <MdOutlinePassword className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none focus:border-brand-primary"
              placeholder="Enter password"
            />

            <FaEye
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-primary text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?
          <span
            className="ml-1 font-semibold text-brand-primary cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex w-[45%] h-[90vh] rounded-[40px] bg-brand-primary text-text-primary p-10 flex-col justify-center">
        <img src={railologo} alt="Rialo" className="w-20 h-20 mb-8" />

        <h2 className="text-4xl font-bold">
          Welcome to <span className="text-brand-secondary">Connecto</span>
        </h2>

        <p className="mt-4 text-lg text-text-primary/80">
          Connect with builders, contributors, and communities on Connecto.
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
      </div>
    </div>
  );
};

export default CreateAccount;