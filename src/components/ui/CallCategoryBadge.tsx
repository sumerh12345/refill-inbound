
import React from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, PlusCircle, HelpCircle, AlertCircle, PhoneCall } from "lucide-react";

export type CallCategory = 
  | "medication-question" 
  | "new-prescription" 
  | "insurance-inquiry" 
  | "side-effects" 
  | "general";

interface CallCategoryBadgeProps {
  category: CallCategory;
  className?: string;
}

const CallCategoryBadge = ({ category, className }: CallCategoryBadgeProps) => {
  const getIconAndColor = () => {
    switch (category) {
      case "medication-question":
        return { 
          icon: <HelpCircle className="h-3.5 w-3.5 mr-1" />, 
          bgColor: "bg-blue-100",
          textColor: "text-blue-800"
        };
      case "new-prescription":
        return { 
          icon: <PlusCircle className="h-3.5 w-3.5 mr-1" />, 
          bgColor: "bg-green-100",
          textColor: "text-green-800"
        };
      case "insurance-inquiry":
        return { 
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />, 
          bgColor: "bg-purple-100",
          textColor: "text-purple-800"
        };
      case "side-effects":
        return { 
          icon: <MessageCircle className="h-3.5 w-3.5 mr-1" />, 
          bgColor: "bg-red-100",
          textColor: "text-red-800"
        };
      default:
        return { 
          icon: <PhoneCall className="h-3.5 w-3.5 mr-1" />, 
          bgColor: "bg-gray-100",
          textColor: "text-gray-800"
        };
    }
  };

  const { icon, bgColor, textColor } = getIconAndColor();
  
  return (
    <span className={cn(
      "pill inline-flex items-center", 
      bgColor, 
      textColor,
      className
    )}>
      {icon}
      {category.split("-").map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(" ")}
    </span>
  );
};

export default CallCategoryBadge;
