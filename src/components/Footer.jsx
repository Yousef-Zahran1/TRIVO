// src/components/Footer.jsx
import React, { useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const location = useLocation();

  useGSAP(() => {
    // تأكد من إنهاء أي أنيميشن سابق
    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current, 
        { scale: 0.7, y: -50, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 2,
          }
        }
      );
    }, footerRef);

    return () => ctx.revert(); // تنظيف عند إزالة المكون
  }, { scope: footerRef, dependencies: [location.pathname] }); // إضافة location.pathname كـ dependency

  // تحديث ScrollTrigger عند تغيير الصفحة
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <footer ref={footerRef} className="bg-black text-white pt-3 pb-8 px-6 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 h-full w-[30%] opacity-[0.03] z-0 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="red">
          <path d="M 0,0 L 50,100 L 100,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div ref={logoRef} className="flex justify-center items-center relative">
          <Link to="/">
            <img 
              src="/logo2.jpg"
              alt="TRIVO Logo"
              className="w-[full] min-w-[250px]"
            />
          </Link>
          <div className="absolute inset-0 bg-red-600/10 blur-[100px] z-[-1]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm font-mono tracking-widest text-white/50 border-t border-white/10 pt-16">
          
          <div>
            <h4 className="text-white font-black uppercase text-base mb-6 tracking-tight">DISRUPTIVE STUDIO</h4>
            <p className="text-xs leading-relaxed max-w-xs font-light">
              We push the boundaries of digital design and experience, creating high-performance visual ecosystems.
            </p>
          </div>

          <div>
            <h4 className="text-red-500 font-bold uppercase mb-6 tracking-[0.2em]">// Exploring</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="hover:text-red-500 transition-colors hover:font-bold">Shop All Collection</Link></li>
              <li><a href="#" className="hover:text-red-500 transition-colors hover:font-bold">Latest Gear drops</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors hover:font-bold">About the TRION Story</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-red-500 font-bold uppercase mb-6 tracking-[0.2em]">// Digital Gear</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-red-500 transition-colors hover:font-bold">Interactive Specs</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors hover:font-bold">Cybernetics Drops</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors hover:font-bold">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-red-500 font-bold uppercase mb-6 tracking-[0.2em]">// Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-red-500 transition-colors hover:font-bold">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors hover:font-bold">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors hover:font-bold">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-mono text-white/30 tracking-widest uppercase relative">
          
          <p>© 2026 Disruptive Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Behance</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <p>BUILT BY <span className="text-white">YOUSEF ZAHRAN</span></p>

          <div className="absolute top-[-1px] left-0 h-[2px] w-[20%] bg-gradient-to-r from-red-600 to-transparent" />
        </div>
        
      </div>
    </footer>
  )
}

export default Footer;