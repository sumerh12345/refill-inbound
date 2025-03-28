
import React from "react";
import PatientCard from "@/components/ui/PatientCard";

export interface Patient {
  id: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  insuranceId: string;
  medicareEligible: boolean;
}

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
}

const PatientList = ({ patients, onSelectPatient }: PatientListProps) => {
  return (
    <div>
      {patients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient, index) => (
            <PatientCard 
              key={patient.id} 
              patient={patient} 
              className="animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onSelectPatient(patient)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No patients found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default PatientList;
