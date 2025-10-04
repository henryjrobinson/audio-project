import { Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // Array of creative loading messages
  const loadingMessages = [
    "Gears are spinning and code elves are still typing away.",
    "Your app's in the workshop—hammering and welding features.",
    "Seeds planted, watering daily—your app's growing.",
    "The orchestra's rehearsing—your app's score is being written.",
    "We're sprinting through code and hurdling over bugs as we build.",
    "Your app's training hard in the gym, getting stronger each day.",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setIsVisible(false);

      // After fade out completes, change message and fade in
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        setIsVisible(true);
      }, 500); // 500ms for fade out
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Spinning Gear Icon */}
      <div className="mb-8">
        <Settings
          className="w-16 h-16 text-gray-400 animate-spin"
          style={{ animationDuration: "3s" }}
        />
      </div>

      {/* Main Text with Fade Animation */}
      <h1
        className={`text-xl font-medium text-gray-300 text-center max-w-md transition-opacity duration-500 mb-8 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {loadingMessages[currentMessageIndex]}
      </h1>

      {/* Demo Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          Owner Dashboard
        </Button>
        <Button
          onClick={() => navigate('/dashboard/elderly')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
        >
          Elderly Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;