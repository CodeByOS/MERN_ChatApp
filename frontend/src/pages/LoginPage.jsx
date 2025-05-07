import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageCircle } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content mb-1.5">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 ps-3 flex items-center pointer-events-none z-10">
                  <Mail className="size-5 text-base-content/50" />
                </div>
                <input
                  type="text"
                  className="w-full ps-12 py-2.5 rounded-lg bg-base-200 border border-base-300 
                    hover:border-base-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 
                    text-base-content placeholder-base-content/50 transition focus:scale-[1.02] focus:shadow-md duration-200"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content mb-1.5">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 ps-3 flex items-center pointer-events-none z-10">
                  <Lock className="size-5 text-base-content/50" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full ps-12 pe-12 py-2.5 rounded-lg bg-base-200 border border-base-300 
                    hover:border-base-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 
                    text-base-content placeholder-base-content/50 transition focus:scale-[1.02] focus:shadow-md duration-200"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  className="absolute inset-y-0 right-0 pe-3 flex items-center z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="size-5 text-base-content/50" />
                  ) : (
                    <EyeOff className="size-5 text-base-content/50" />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 
              text-white font-semibold rounded-lg py-2 transition duration-300"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};
export default LoginPage;