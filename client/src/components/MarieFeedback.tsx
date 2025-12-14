import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MarieFeedbackProps {
  message: string;
  type?: "info" | "error" | "success" | "loading";
  className?: string;
}

export function MarieFeedback({ message, type = "info", className }: MarieFeedbackProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const getBgColor = () => {
    switch (type) {
      case "error": return "bg-destructive text-destructive-foreground";
      case "success": return "bg-accent text-accent-foreground";
      case "loading": return "bg-primary text-primary-foreground";
      default: return "bg-black text-white";
    }
  };

  return (
    <div 
      className={cn(
        "relative p-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        getBgColor(),
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="absolute -top-6 -left-4 bg-white border-2 border-black px-2 py-1 transform -rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <span className="font-display text-xl text-black">MARIE SAYS...</span>
      </div>
      
      <div className="font-sans text-lg font-bold uppercase tracking-wide">
        {type === 'loading' && <span className="inline-block animate-pulse mr-2">⚡</span>}
        "{message}"
      </div>
      
      {/* Decorative corner triangles */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-white/30"></div>
      <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[20px] border-l-[20px] border-b-transparent border-l-white/30"></div>
    </div>
  );
}
