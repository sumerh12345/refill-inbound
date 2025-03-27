
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PatientList, { Patient } from "@/components/patient/PatientList";
import PatientDetail from "@/components/patient/PatientDetail";
import PatientSearch, { FilterOption } from "@/components/patient/PatientSearch";
import { patientData } from "@/data/patientData";
import { callHistory } from "@/data/callData";

const PatientInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState<FilterOption>("all");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Filter patients based on search term and filter value
  const filteredPatients = patientData.filter(patient => {
    // First apply the search filter
    const matchesSearch = !searchTerm || 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then apply the Medicare filter
    const matchesMedicare = 
      filterValue === "all" || 
      (filterValue === "medicare" && patient.medicareEligible) ||
      (filterValue === "non-medicare" && !patient.medicareEligible);
    
    return matchesSearch && matchesMedicare;
  });

  // Get calls for selected patient
  const patientCalls = selectedPatient
    ? callHistory.filter(call => call.patientId === selectedPatient.id)
    : [];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value: FilterOption) => {
    setFilterValue(value);
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleBackToPatients = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Patient Information</h1>
            <p className="text-muted-foreground">
              View and manage patient profiles and Medicare eligibility
            </p>
          </div>
          
          {/* Search and Actions */}
          {!selectedPatient && (
            <PatientSearch
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              filterValue={filterValue}
              onFilterChange={handleFilterChange}
            />
          )}
          
          {selectedPatient ? (
            <PatientDetail
              patient={selectedPatient}
              patientCalls={patientCalls}
              onBack={handleBackToPatients}
            />
          ) : (
            <PatientList
              patients={filteredPatients}
              onSelectPatient={handleSelectPatient}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PatientInfo;
