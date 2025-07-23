"use client";

import { useEffect, useState } from "react";

export default function WelcomeWrapper({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);
  const [LottiePlayer, setLottiePlayer] = useState<any>(null);

  useEffect(() => {
    // Dynamically import LottiePlayer only on client
    import("@lottiefiles/react-lottie-player").then((module) => {
      setLottiePlayer(() => module.Player);
    });

    const timer = setTimeout(() => setShowContent(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showContent || !LottiePlayer) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-6">
        {LottiePlayer && (
          <LottiePlayer
            autoplay
            loop={false}
            src="/Images/Cute Tiger.json"
            style={{ height: "300px", width: "300px" }}
          />
        )}
       <h1 className="text-3xl md:text-5xl font-bold text-indigo-600 animate-fade-in-up drop-shadow-md transition-all duration-500">
  Hi! Welcome to Travgo
</h1>
      </div>
    );
  }

  return <>{children}</>;
}
    
