import { Link } from "react-router-dom";
import { themes } from "../constants/themes"; 
import { useAuthStore } from "../store/useAuthStore";
import useThemeStore from "../store/useThemeStore";
import { LogOut, MessageCircle, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all duration-300 hover:scale-105">
            <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight hidden lg:block">Hello World</h1>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Theme Switcher */}
            <select
              className="select select-sm select-bordered"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="" disabled>
                Change theme
              </option>

              {themes.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.emoji} {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                </option>
              ))}
            </select>

            {/* Profile & Logout */}
            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm gap-2 transition-all hover:opacity-90 rounded-full hover:scale-105 duration-300">
                  <User className="size-5" />
                  <span className="hidden sm:inline relative group">
                    Profile
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full duration-300"></span>
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-sm gap-2 transition-all hover:opacity-90 flex items-center rounded-full hover:scale-105 duration-300"
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline relative group">
                    Logout
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full duration-300"></span>
                  </span>
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;