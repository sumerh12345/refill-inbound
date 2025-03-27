
import React from "react";
import { format } from "date-fns";
import { Clock, ShieldAlert } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import CallCategoryBadge, { CallCategory } from "./CallCategoryBadge";

export interface Call {
  id: string;
  patientName: string;
  patientId: string;
  timestamp: Date;
  duration: number; // in seconds
  category: CallCategory;
  medications?: string[];
  notes?: string;
  status: "completed" | "in-progress" | "needs-followup";
}

interface CallsTableProps {
  calls: Call[];
  onSelectCall?: (call: Call) => void;
  className?: string;
  isLoading?: boolean;
}

const CallsTable = ({ calls, onSelectCall, className, isLoading = false }: CallsTableProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className={cn("animate-pulse", className)}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><div className="h-6 w-48 bg-gray-200 rounded"></div></TableCell>
                <TableCell><div className="h-6 w-24 bg-gray-200 rounded"></div></TableCell>
                <TableCell><div className="h-6 w-16 bg-gray-200 rounded"></div></TableCell>
                <TableCell><div className="h-6 w-32 bg-gray-200 rounded"></div></TableCell>
                <TableCell><div className="h-6 w-24 bg-gray-200 rounded"></div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <div className="flex flex-col items-center">
                  <ShieldAlert className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No calls recorded</p>
                  <p className="text-sm text-muted-foreground mt-1">Call data will appear here once available</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            calls.map((call) => (
              <TableRow 
                key={call.id} 
                className="animate-fade-in cursor-pointer hover:bg-accent/50"
                onClick={() => onSelectCall && onSelectCall(call)}
              >
                <TableCell>
                  <div>
                    <p className="font-medium">{call.patientName}</p>
                    <p className="text-sm text-muted-foreground">ID: {call.patientId}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{format(call.timestamp, "MMM d, yyyy")}</p>
                    <p className="text-muted-foreground">{format(call.timestamp, "h:mm a")}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>{formatDuration(call.duration)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <CallCategoryBadge category={call.category} />
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "pill",
                    call.status === "completed" ? "bg-green-100 text-green-800" : 
                    call.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                    "bg-amber-100 text-amber-800"
                  )}>
                    {call.status === "completed" ? "Completed" : 
                     call.status === "in-progress" ? "In Progress" : 
                     "Needs Follow-up"}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CallsTable;
