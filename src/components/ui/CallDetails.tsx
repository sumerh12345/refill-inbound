
import React from "react";
import { format } from "date-fns";
import { User, Clock, Calendar, MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type Call } from "./CallsTable";
import CallCategoryBadge from "./CallCategoryBadge";
import MedicationSearch from "./MedicationSearch";

interface CallDetailsProps {
  call: Call;
  onClose: () => void;
  className?: string;
}

const CallDetails = ({ call, onClose, className }: CallDetailsProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={cn("glass-card p-6 animate-fade-in", className)}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{call.patientName}</h3>
            <p className="text-sm text-muted-foreground">Patient ID: {call.patientId}</p>
          </div>
        </div>
        
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{format(call.timestamp, "MMMM d, yyyy h:mm a")}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{formatDuration(call.duration)}</span>
        </div>
        
        <div className="flex items-center">
          <CallCategoryBadge category={call.category} />
        </div>
        
        <div className={cn(
          "pill",
          call.status === "completed" ? "bg-green-100 text-green-800" : 
          call.status === "in-progress" ? "bg-blue-100 text-blue-800" :
          "bg-amber-100 text-amber-800"
        )}>
          {call.status === "completed" ? "Completed" : 
           call.status === "in-progress" ? "In Progress" : 
           "Needs Follow-up"}
        </div>
      </div>
      
      {call.medications && call.medications.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Medications Discussed</h4>
          <div className="flex flex-wrap gap-2">
            {call.medications.map((med, idx) => (
              <span key={idx} className="pill bg-accent text-accent-foreground">
                {med}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <h4 className="font-medium mb-2">Medication Verification</h4>
        <div className="p-4 rounded-lg bg-accent/50">
          <MedicationSearch />
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium mb-2">Call Notes</h4>
        <textarea 
          className="w-full min-h-[100px] p-3 border border-input rounded-md" 
          placeholder="Enter call notes here..."
          defaultValue={call.notes}
        />
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default CallDetails;
