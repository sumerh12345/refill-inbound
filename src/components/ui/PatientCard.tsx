
import React from "react";
import { User, Calendar, Phone, Mail, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    dob: string;
    phone: string;
    email: string;
    insuranceId?: string;
    medicareEligible?: boolean;
  };
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const PatientCard = ({ patient, className, style, onClick }: PatientCardProps) => {
  return (
    <div 
      className={cn("glass-card-hover p-6 animate-fade-in", className)} 
      style={style}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
          </div>
        </div>
        
        <div className={cn(
          "pill",
          patient.medicareEligible 
            ? "bg-green-100 text-green-800" 
            : "bg-amber-100 text-amber-800"
        )}>
          {patient.medicareEligible ? "Medicare Eligible" : "Status Pending"}
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground mr-2">Date of Birth:</span>
          <span>{patient.dob}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground mr-2">Phone:</span>
          <span>{patient.phone}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground mr-2">Email:</span>
          <span>{patient.email}</span>
        </div>
        
        {patient.insuranceId && (
          <div className="flex items-center text-sm">
            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground mr-2">Insurance ID:</span>
            <span>{patient.insuranceId}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
