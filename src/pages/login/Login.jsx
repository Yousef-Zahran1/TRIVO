// src/pages/login/Login.jsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const sectionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login attempt:', { email, password });
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-black text-white pt-32 px-6 flex items-center justify-center pb-20">
      <div className="max-w-md w-full">
        {/* Brand */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img src="/logo5.jpg" alt="TRIVO" className="h-16 w-16 animate-spin-y" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Welcome <span className="text-red-500">Back</span>
          </h1>
          <p className="text-white/40 font-mono text-sm tracking-widest mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 text-white focus:border-red-500 outline-none transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 pl-12 pr-12 py-4 text-white focus:border-red-500 outline-none transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-white/40 hover:text-white transition-colors cursor-pointer">
              <input type="checkbox" className="accent-red-600" />
              <span className="font-mono text-[10px] tracking-widest">Remember me</span>
            </label>
            <a href="#" className="text-red-500 font-mono text-[10px] tracking-widest hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-8">
          <p className="text-white/40 font-mono text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-white hover:text-red-500 transition-colors font-bold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;