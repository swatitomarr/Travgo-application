"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((m) => m.Player),
  { ssr: false }
);

export default function WelcomeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-6">
        <LottiePlayer
          autoplay
          loop={false}
          src="/Images/Cute Tiger.json"
          className="h-[300px] w-[300px]"
        />
        <h1 className="text-3xl md:text-5xl font-bold text-indigo-600 animate-fade-in-up drop-shadow-md transition-all duration-500">
          Hi! Welcome to Travgo
        </h1>
      </div>
    );
  }

  return <>{children}</>;
}

    
