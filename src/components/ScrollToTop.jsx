// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    
    if (smoother) {
      smoother.paused(true);
      
      smoother.scrollTo(0, false, "top");
      
      requestAnimationFrame(() => {
        smoother.paused(false);
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}