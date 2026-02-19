"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const hide = () => {
      setTimeout(() => {
        setFading(true);
        setTimeout(() => {
          setVisible(false);
          document.body.classList.add("loaded");
        }, 200);
      }, 1000);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
      return () => window.removeEventListener("load", hide);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#009869] transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <Image
        src="/logo-animated.gif"
        alt="Loading"
        width={64}
        height={64}
        unoptimized
      />
    </div>
  );
}
