// src/components/Header.jsx
import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // <-- أضف useLocation
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { FiShoppingBag, FiUser } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // <-- أضف ده

  useGSAP(() => {
    if (isOpen) return;

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1) {
          gsap.to(headerRef.current, { 
            yPercent: -150, 
            duration: 0.3, 
            ease: "power2.out" 
          });
        } else if (self.direction === -1) {
          gsap.to(headerRef.current, { 
            yPercent: 0,
            duration: 0.3, 
            ease: "power2.out" 
          });
        }
      }
    });
  }, { scope: headerRef, dependencies: [isOpen] });

  const navLinks = [
    { name: 'Collection', path: '/shop' },
    { name: 'About', path: '/#about' },
    { name: 'Archive', path: '/#archive' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <>
    <style>{`
      @keyframes spinY {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(360deg); }
        100% { transform: rotateY(0deg); }
      }
      .animate-spin-y {
        animation: spinY 8s linear infinite;
        perspective: 1000px;
      }
    `}</style>

      <header 
        ref={headerRef} 
        className="fixed top-4 left-0 right-0 mx-auto w-[92%] z-[100] px-6 md:px-10 py-4 flex justify-between items-center bg-black/20 backdrop-blur-md border border-white/10 rounded-full shadow-2xl will-change-transform"
      >
        {/* اللوجو - يرجع للهوم */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer relative z-[101]">
          <img 
            src="/logo5.jpg" 
            alt="TRIVO" 
            className="h-10 w-10 animate-spin-y transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* الروابط للشاشات الكبيرة */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-[14px] font-medium uppercase tracking-[0.2em] transition-colors ${
                location.pathname === item.path ? 'text-red-500' : 'text-white/90 hover:text-red-500'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* الأزرار + أيقونة الموبايل */}
        <div className="flex items-center gap-4 md:gap-6 relative z-[101]">
          <Link to="/login" className="text-white/70 hover:text-white transition-colors duration-300 cursor-pointer p-1" title="Account">
            <FiUser size={23} className="transition-transform duration-300 hover:scale-110" />
          </Link>

          <Link to="/cart" className="relative text-white/70 hover:text-white transition-colors duration-300 cursor-pointer p-1" title="Cart">
            <FiShoppingBag size={23} className="transition-transform duration-300 hover:scale-110" />
            <span className="absolute -top-1 -right-1.5 bg-red-600 text-white font-mono text-[14px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
              0
            </span>
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-red-500 transition-colors"
          >
            {isOpen ? <HiX size={26} /> : <HiOutlineMenuAlt3 size={26} />}
          </button>
        </div>

        {/* الـ Overlay المنيو للموبايل */}
        <div className={`
          absolute top-0 left-0 w-full h-[100vh] bg-black/95 backdrop-blur-xl 
          rounded-[2rem] flex flex-col items-center justify-center gap-8
          transition-all duration-500 ease-in-out border border-white/10
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
          md:hidden
        `}>
          {navLinks.map((item, i) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`
                text-2xl font-black uppercase tracking-[0.3em] text-white hover:text-red-500 
                transition-all transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="absolute bottom-12 text-white/20 font-mono text-[10px] tracking-widest">
            TRIVO © 2026 / CUSTOM APPAREL
          </div>
        </div>
      </header>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[99] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Header;