import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageCircle, User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';

import toast from "react-hot-toast";


const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const { fullName, email, password } = formData;
    if (!fullName.trim()) {
      toast.error("Full name is required");
      return false; // Don't proceed to backend if validation fails
    }
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
  
    return true; // Form is valid, proceed to backend
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) signup(formData);
  };

  return (
    <div className="h-screen pt-16 grid lg:grid-cols-2 bg-base-200 overflow-hidden">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-base-100 p-8 rounded-2xl shadow-lg">

          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-base-content">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content mb-1.5">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/50" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 py-2.5 rounded-lg bg-base-200 border border-base-300 
                    hover:border-base-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 
                    text-base-content placeholder-base-content/50 transition focus:scale-[1.02] focus:shadow-md duration-200"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content mb-1.5">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/50" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 py-2.5 rounded-lg bg-base-200 border border-base-300 
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/50" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-base-200 border border-base-300 
                    hover:border-base-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 
                    text-base-content placeholder-base-content/50 transition focus:scale-[1.02] focus:shadow-md duration-200"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* right side */}
      <div className="hidden lg:block bg-base-200">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
    </div>
  );
};

export default SignUpPage;
