
import React, { useState } from "react";
import { Search, Plus, Filter, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PatientCard from "@/components/ui/PatientCard";
import CallsTable, { Call } from "@/components/ui/CallsTable";

// Mock patient data
const patientData = [
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
  },
  {
    id: "P78901",
    name: "Robert Miller",
    dob: "08/22/1953",
    phone: "(555) 789-0123",
    email: "robert.miller@example.com",
    insuranceId: "MED78901234",
    medicareEligible: true
  },
  {
    id: "P89012",
    name: "Lisa Anderson",
    dob: "04/05/1977",
    phone: "(555) 890-1234",
    email: "lisa.anderson@example.com",
    insuranceId: "MED89012345",
    medicareEligible: true
  },
  {
    id: "P90123",
    name: "William Thomas",
    dob: "10/17/1962",
    phone: "(555) 901-2345",
    email: "william.thomas@example.com",
    insuranceId: "MED90123456",
    medicareEligible: false
  },
  {
    id: "P01234",
    name: "Elizabeth Jackson",
    dob: "12/30/1969",
    phone: "(555) 012-3456",
    email: "elizabeth.jackson@example.com",
    insuranceId: "MED01234567",
    medicareEligible: true
  },
  {
    id: "P12345A",
    name: "James White",
    dob: "06/08/1971",
    phone: "(555) 123-4569",
    email: "james.white@example.com",
    insuranceId: "MED12345ABC",
    medicareEligible: false
  },
  {
    id: "P23456B",
    name: "Mary Harris",
    dob: "01/25/1968",
    phone: "(555) 234-5670",
    email: "mary.harris@example.com",
    insuranceId: "MED23456BCD",
    medicareEligible: true
  },
  {
    id: "P34567C",
    name: "Richard Martinez",
    dob: "09/11/1955",
    phone: "(555) 345-6781",
    email: "richard.martinez@example.com",
    insuranceId: "MED34567CDE",
    medicareEligible: true
  },
  {
    id: "P45678D",
    name: "Patricia Robinson",
    dob: "03/03/1983",
    phone: "(555) 456-7892",
    email: "patricia.robinson@example.com",
    insuranceId: "MED45678DEF",
    medicareEligible: false
  },
  {
    id: "P56789E",
    name: "Charles Lewis",
    dob: "07/19/1960",
    phone: "(555) 567-8903",
    email: "charles.lewis@example.com",
    insuranceId: "MED56789EFG",
    medicareEligible: true
  }
];

// Mock call data - calls linked to patients
const callHistory = [
  {
    id: "call1",
    patientId: "P12345",
    patientName: "John Smith",
    timestamp: new Date(2025, 2, 26, 9, 25),
    duration: 325,
    category: "medication-question",
    medications: ["Atorvastatin", "Lisinopril"],
    notes: "Patient had questions about potential side effects of Atorvastatin.",
    status: "completed"
  },
  {
    id: "call2",
    patientId: "P23456",
    patientName: "Emma Johnson",
    timestamp: new Date(2025, 2, 26, 8, 55),
    duration: 187,
    category: "new-prescription",
    medications: ["Metformin"],
    notes: "Patient requested a new prescription for Metformin.",
    status: "needs-followup"
  },
  {
    id: "call3",
    patientId: "P34567",
    patientName: "Michael Brown",
    timestamp: new Date(2025, 2, 26, 7, 40),
    duration: 412,
    category: "insurance-inquiry",
    medications: ["Omeprazole", "Azithromycin"],
    status: "completed"
  },
  {
    id: "call4",
    patientId: "P45678",
    patientName: "Sarah Davis",
    timestamp: new Date(2025, 2, 26, 9, 40),
    duration: 85,
    category: "side-effects",
    status: "in-progress"
  },
  {
    id: "call5",
    patientId: "P12345",
    patientName: "John Smith",
    timestamp: new Date(2025, 2, 25, 14, 20),
    duration: 275,
    category: "medication-question",
    status: "completed"
  },
  {
    id: "call6",
    patientId: "P23456",
    patientName: "Emma Johnson",
    timestamp: new Date(2025, 2, 25, 11, 30),
    duration: 198,
    category: "insurance-inquiry",
    status: "needs-followup"
  },
  {
    id: "call7",
    patientId: "P78901",
    patientName: "Robert Miller",
    timestamp: new Date(2025, 2, 26, 4, 45),
    duration: 356,
    category: "new-prescription",
    status: "completed"
  },
  {
    id: "call8",
    patientId: "P89012",
    patientName: "Lisa Anderson",
    timestamp: new Date(2025, 2, 26, 3, 20),
    duration: 167,
    category: "side-effects",
    status: "needs-followup"
  },
  {
    id: "call9",
    patientId: "P12345",
    patientName: "John Smith",
    timestamp: new Date(2025, 2, 24, 10, 15),
    duration: 230,
    category: "medication-question",
    medications: ["Atorvastatin"],
    status: "completed"
  },
  {
    id: "call10",
    patientId: "P34567",
    patientName: "Michael Brown",
    timestamp: new Date(2025, 2, 25, 9, 30),
    duration: 185,
    category: "side-effects",
    status: "completed"
  },
  {
    id: "call11",
    patientId: "P56789",
    patientName: "David Wilson",
    timestamp: new Date(2025, 2, 24, 14, 45),
    duration: 310,
    category: "insurance-inquiry",
    status: "completed"
  },
  {
    id: "call12",
    patientId: "P90123",
    patientName: "William Thomas",
    timestamp: new Date(2025, 2, 23, 11, 20),
    duration: 275,
    category: "new-prescription",
    status: "completed"
  }
];

const PatientInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Filter patients based on search term
  const filteredPatients = searchTerm 
    ? patientData.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : patientData;

  // Get calls for selected patient
  const patientCalls = selectedPatient
    ? callHistory.filter(call => call.patientId === selectedPatient.id)
    : [];

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
          
          {selectedPatient ? (
            <div className="animate-fade-in space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Patient Details: {selectedPatient.name}</h2>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Back to All Patients
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <PatientCard 
                    patient={selectedPatient}
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
          ) : (
            /* Patient Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <PatientCard 
                    key={patient.id} 
                    patient={patient} 
                    className="animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedPatient(patient)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No patients found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PatientInfo;
