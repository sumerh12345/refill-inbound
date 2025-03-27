
import React, { useState } from "react";
import { format } from "date-fns";
import { User, Clock, Calendar, X, Headphones, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type Call } from "./CallsTable";
import CallCategoryBadge from "./CallCategoryBadge";

interface CallDetailsProps {
  call: Call;
  onClose: () => void;
  className?: string;
}

const CallDetails = ({ call, onClose, className }: CallDetailsProps) => {
  const [notes, setNotes] = useState(call.notes || "");
  const [isPlaying, setIsPlaying] = useState(false);
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Toggle audio playback
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control the actual audio playback
  };

  return (
    <div className={cn("bg-white rounded-xl shadow-lg p-6 animate-fade-in", className)}>
      {/* Header with patient info and close button */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-6 w-6 text-blue-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{call.patientName}</h3>
            <p className="text-sm text-muted-foreground">Patient ID: {call.patientId}</p>
          </div>
        </div>
        
        <Button variant="ghost" size="icon" onClick={onClose} className="mt-1">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Call details */}
      <div className="flex flex-wrap gap-4 mb-6">
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
      
      {/* Audio Recording Player */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Call Recording</h4>
        <div className="bg-gray-50 border rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Headphones className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <p className="font-medium">Call Audio Recording</p>
              <p className="text-sm text-muted-foreground">{formatDuration(call.duration)}</p>
            </div>
          </div>
          <Button 
            onClick={togglePlayback} 
            variant="outline" 
            className="rounded-full h-10 w-10 p-0 flex items-center justify-center"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {/* Medication Verification - Show coverage info directly */}
      {call.medications && call.medications.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-3">Medication Verification</h4>
          <div className="space-y-3">
            {call.medications.map((med, idx) => {
              // Simulating coverage info - in a real app, this would come from an API
              const isCovered = idx % 2 === 0; // Mock logic for demo
              return (
                <div key={idx} className="p-3 rounded-lg border bg-white">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{med}</p>
                      <p className="text-sm text-muted-foreground">Standard dosage</p>
                    </div>
                    <div className={cn(
                      "pill self-start",
                      isCovered ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    )}>
                      {isCovered ? "Covered" : "Not Covered"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Call Notes */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Call Notes</h4>
        <textarea 
          className="w-full min-h-[100px] p-3 border border-input rounded-md" 
          placeholder="Enter call notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      
      {/* Call Transcript */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Complete Transcript</h4>
        <div className="border rounded-md p-4 max-h-60 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="font-medium text-blue-600 min-w-20">Agent:</div>
              <div>Hello, thank you for calling. How can I help you today?</div>
            </div>
            <div className="flex gap-3">
              <div className="font-medium text-gray-700 min-w-20">Patient:</div>
              <div>Hi, I had a question about my Atorvastatin prescription. I've been experiencing some muscle pain and I'm wondering if it could be a side effect.</div>
            </div>
            <div className="flex gap-3">
              <div className="font-medium text-blue-600 min-w-20">Agent:</div>
              <div>I understand your concern. Muscle pain can indeed be a side effect of Atorvastatin. How long have you been taking this medication?</div>
            </div>
            <div className="flex gap-3">
              <div className="font-medium text-gray-700 min-w-20">Patient:</div>
              <div>About three weeks now. The muscle pain started a few days ago.</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default CallDetails;
