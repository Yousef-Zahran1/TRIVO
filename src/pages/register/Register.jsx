// src/pages/register/Register.jsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const sectionRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions.');
      return;
    }
    console.log('Register attempt:', formData);
  };

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen bg-black text-white pt-32 px-6 pb-20 flex items-start md:items-center justify-center"
    >
      <div className="max-w-md w-full mt-4 md:mt-0">
        {/* Brand */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <img src="/logo5.jpg" alt="TRIVO" className="h-16 w-16 animate-spin-y" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Join <span className="text-red-500">TRIVO</span>
          </h1>
          <p className="text-white/40 font-mono text-sm tracking-widest mt-2">
            Create your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 text-white focus:border-red-500 outline-none transition-colors"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
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

          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 pl-12 pr-12 py-4 text-white focus:border-red-500 outline-none transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAgreeTerms(!agreeTerms)}
              className={`w-5 h-5 border flex items-center justify-center transition-colors flex-shrink-0 ${
                agreeTerms ? 'bg-red-600 border-red-600' : 'border-white/30'
              }`}
            >
              {agreeTerms && <FaCheckCircle size={12} className="text-white" />}
            </button>
            <p className="text-white/40 font-mono text-[10px] tracking-widest">
              I agree to the{' '}
              <a href="#" className="text-white hover:text-red-500 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-white hover:text-red-500 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8 pb-4">
          <p className="text-white/40 font-mono text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:text-red-500 transition-colors font-bold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;