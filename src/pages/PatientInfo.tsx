
import React, { useState } from "react";
import { Search, Plus, Filter, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PatientCard from "@/components/ui/PatientCard";

const PatientInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock patient data
  const patients = [
    {
      id: "P12345",
      name: "John Smith",
      dob: "05/12/1965",
      phone: "(555) 123-4567",
      email: "john.smith@example.com",
      insuranceId: "MED12345678",
      medicareEligible: true
    },
    {
      id: "P23456",
      name: "Emma Johnson",
      dob: "09/23/1972",
      phone: "(555) 234-5678",
      email: "emma.johnson@example.com",
      insuranceId: "MED23456789",
      medicareEligible: true
    },
    {
      id: "P34567",
      name: "Michael Brown",
      dob: "11/08/1958",
      phone: "(555) 345-6789",
      email: "michael.brown@example.com",
      insuranceId: "MED34567890",
      medicareEligible: true
    },
    {
      id: "P45678",
      name: "Sarah Davis",
      dob: "03/17/1980",
      phone: "(555) 456-7890",
      email: "sarah.davis@example.com",
      insuranceId: "MED45678901",
      medicareEligible: false
    },
    {
      id: "P56789",
      name: "David Wilson",
      dob: "07/30/1967",
      phone: "(555) 567-8901",
      email: "david.wilson@example.com",
      insuranceId: "MED56789012",
      medicareEligible: true
    },
    {
      id: "P67890",
      name: "Jennifer Taylor",
      dob: "02/14/1975",
      phone: "(555) 678-9012",
      email: "jennifer.taylor@example.com",
      insuranceId: "MED67890123",
      medicareEligible: false
    }
  ];
  
  const filteredPatients = searchTerm 
    ? patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : patients;

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
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                className="search-input pl-10"
                placeholder="Search patients by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </button>
              <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-input bg-background hover:bg-accent transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-input bg-background hover:bg-accent transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
          
          {/* Patient Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <PatientCard 
                  key={patient.id} 
                  patient={patient} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No patients found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PatientInfo;
