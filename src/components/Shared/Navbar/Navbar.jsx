import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/placeholder.jpg";
import logo from "../../../assets/logo-l.png";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");

    // your existing theme system (daisyui)
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // extra: enables tailwind dark: styles (only for readability/design)
    html.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toogleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="fixed top-0 w-full z-50 border-b bg-white/90 backdrop-blur dark:bg-gray-950/80 dark:border-gray-800">
      <Container>
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
            <img src={logo} alt="logo" width="75" height="75" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { to: "/", label: "Home" },
              { to: "/all-contests", label: "Contests" },
              { to: "/support", label: "Support" },
              { to: "/membership", label: "Membership" },
              { to: "/leaderboard", label: "Leaderboard" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right side: Theme + Menu */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle (nice placement) */}
            <label className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border bg-white hover:bg-gray-50 transition cursor-pointer dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800">
              <FiSun className="text-gray-500 dark:text-gray-300" />
              <input
                onChange={(e) => toogleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked={localStorage.getItem("theme") === "dark"}
                className="toggle toggle-sm"
              />
              <FiMoon className="text-gray-500 dark:text-gray-300" />
            </label>

            {/* Dropdown Menu Button */}
            <div className="relative">
              <div className="flex items-center">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 md:py-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition bg-white dark:bg-gray-900 dark:border-gray-700"
                >
                  <AiOutlineMenu className="text-gray-800 dark:text-gray-100" />
                  <div className="hidden md:block">
                    <img
                      className="rounded-full w-8 h-8 object-cover"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                    />
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="absolute right-0 top-12 rounded-xl shadow-md w-64 md:w-56 overflow-hidden text-sm border bg-white dark:bg-gray-950 dark:border-gray-800">
                  <div className="flex flex-col">
                    {/* Theme toggle on mobile inside menu */}
                    <div className="sm:hidden px-4 py-3 border-b dark:border-gray-800 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Theme
                      </span>
                      <label className="flex items-center gap-2">
                        <FiSun className="text-gray-500 dark:text-gray-300" />
                        <input
                          onChange={(e) => toogleTheme(e.target.checked)}
                          type="checkbox"
                          defaultChecked={localStorage.getItem("theme") === "dark"}
                          className="toggle toggle-sm"
                        />
                        <FiMoon className="text-gray-500 dark:text-gray-300" />
                      </label>
                    </div>

                    {/* Mobile nav links */}
                    <div className="md:hidden border-b dark:border-gray-800">
                      {[
                        { to: "/", label: "Home" },
                        { to: "/all-contests", label: "Contests" },
                        { to: "/support", label: "Support" },
                        { to: "/membership", label: "Membership" },
                        { to: "/leaderboard", label: "Leaderboard" },
                      ].map((item) => (
                        <Link
                          key={item.to}
                          onClick={closeMenu}
                          to={item.to}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {/* Auth menu */}
                    {user ? (
                      <>
                        <h2 className="px-4 py-3 text-blue-800 dark:text-blue-400 font-semibold border-b truncate dark:border-gray-800">
                          {user.displayName}
                        </h2>

                        <Link
                          onClick={closeMenu}
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                        >
                          Dashboard
                        </Link>

                        <div
                          onClick={() => {
                            logOut();
                            closeMenu();
                          }}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer text-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          onClick={closeMenu}
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                        >
                          Login
                        </Link>
                        <Link
                          onClick={closeMenu}
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
