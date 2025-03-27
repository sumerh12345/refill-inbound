
import React from "react";
import { PhoneIncoming, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Call {
  id: string;
  patientName: string;
  patientId: string;
  timestamp: Date;
  duration: number; // in seconds
  medications?: string[];
  notes?: string;
  status: "completed" | "in-progress";
}

interface CallLogProps {
  calls: Call[];
  onSelectCall?: (call: Call) => void;
  className?: string;
}

const CallLog = ({ calls, onSelectCall, className }: CallLogProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="section-heading">Recent Calls</h3>
      
      <div className="space-y-3">
        {calls.length === 0 ? (
          <div className="glass-card p-6 text-center">
            <p className="text-muted-foreground">No recent calls</p>
          </div>
        ) : (
          calls.map((call) => (
            <div 
              key={call.id}
              className="glass-card-hover p-4 cursor-pointer animate-fade-in"
              onClick={() => onSelectCall && onSelectCall(call)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <PhoneIncoming className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">{call.patientName}</h4>
                    <p className="text-sm text-muted-foreground">Patient ID: {call.patientId}</p>
                  </div>
                </div>
                
                <div className={cn(
                  "pill",
                  call.status === "completed" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-blue-100 text-blue-800"
                )}>
                  {call.status === "completed" ? "Completed" : "In Progress"}
                </div>
              </div>
              
              <div className="mt-3 flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>{format(call.timestamp, "MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{format(call.timestamp, "h:mm a")}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">{formatDuration(call.duration)}</span>
                </div>
              </div>
              
              {call.medications && call.medications.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {call.medications.map((med, idx) => (
                      <span key={idx} className="pill bg-accent text-accent-foreground">
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CallLog;
