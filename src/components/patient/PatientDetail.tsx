
import React from "react";
import PatientCard from "@/components/ui/PatientCard";
import CallsTable, { Call } from "@/components/ui/CallsTable";
import { Patient } from "./PatientList";

interface PatientDetailProps {
  patient: Patient;
  patientCalls: Call[];
  onBack: () => void;
}

const PatientDetail = ({ patient, patientCalls, onBack }: PatientDetailProps) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Patient Details: {patient.name}</h2>
        <button
          onClick={onBack}
          className="text-sm text-blue-600 hover:underline"
        >
          Back to All Patients
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <PatientCard 
            patient={patient}
            className="w-full"
          />
        </div>
        
        <div className="md:col-span-2">
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Call History</h3>
            {patientCalls.length > 0 ? (
              <CallsTable 
                calls={patientCalls}
                className="w-full"
              />
            ) : (
              <p className="text-center py-8 text-muted-foreground">No call history found for this patient.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
