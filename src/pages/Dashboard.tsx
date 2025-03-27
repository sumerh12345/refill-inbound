
import React, { useState } from "react";
import { PhoneIncoming, Search, Clock, User } from "lucide-react";
import { format } from "date-fns";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CallsTable, { Call } from "@/components/ui/CallsTable";
import CallDetails from "@/components/ui/CallDetails";

const Dashboard = () => {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for demo purposes
  const recentCalls: Call[] = [
    {
      id: "call1",
      patientName: "John Smith",
      patientId: "P12345",
      timestamp: new Date(2025, 2, 26, 9, 25), // Mar 26, 2025, 9:25 PM
      duration: 325, // 5 minutes 25 seconds
      category: "medication-question",
      medications: ["Atorvastatin", "Lisinopril"],
      notes: "Patient had questions about potential side effects of Atorvastatin.",
      status: "completed"
    },
    {
      id: "call2",
      patientName: "Emma Johnson",
      patientId: "P23456",
      timestamp: new Date(2025, 2, 26, 8, 55), // Mar 26, 2025, 8:55 PM
      duration: 187, // 3 minutes 7 seconds
      category: "new-prescription",
      medications: ["Metformin"],
      notes: "Patient requested a new prescription for Metformin.",
      status: "needs-followup"
    },
    {
      id: "call3",
      patientName: "Michael Brown",
      patientId: "P34567",
      timestamp: new Date(2025, 2, 26, 7, 40), // Mar 26, 2025, 7:40 PM
      duration: 412, // 6 minutes 52 seconds
      category: "insurance-inquiry",
      medications: ["Omeprazole", "Azithromycin"],
      status: "completed"
    },
    {
      id: "call4",
      patientName: "Sarah Davis",
      patientId: "P45678",
      timestamp: new Date(2025, 2, 26, 9, 40), // Mar 26, 2025, 9:40 PM
      duration: 85, // 1 minute 25 seconds
      category: "side-effects",
      status: "in-progress"
    },
    {
      id: "call5",
      patientName: "David Wilson",
      patientId: "P56789",
      timestamp: new Date(2025, 2, 26, 6, 15), // Mar 26, 2025, 6:15 PM
      duration: 275, // 4 minutes 35 seconds
      category: "medication-question",
      status: "completed"
    },
    {
      id: "call6",
      patientName: "Jennifer Taylor",
      patientId: "P67890",
      timestamp: new Date(2025, 2, 26, 5, 30), // Mar 26, 2025, 5:30 PM
      duration: 198, // 3 minutes 18 seconds
      category: "insurance-inquiry",
      status: "needs-followup"
    },
    {
      id: "call7",
      patientName: "Robert Miller",
      patientId: "P78901",
      timestamp: new Date(2025, 2, 26, 4, 45), // Mar 26, 2025, 4:45 PM
      duration: 356, // 5 minutes 56 seconds
      category: "new-prescription",
      status: "completed"
    },
    {
      id: "call8",
      patientName: "Lisa Anderson",
      patientId: "P89012",
      timestamp: new Date(2025, 2, 26, 3, 20), // Mar 26, 2025, 3:20 PM
      duration: 167, // 2 minutes 47 seconds
      category: "side-effects",
      status: "needs-followup"
    }
  ];
  
  const filteredCalls = searchTerm
    ? recentCalls.filter(call => 
        call.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.patientId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : recentCalls;
    
  const stats = [
    { 
      label: "Today's Calls",
      value: 24,
      icon: <PhoneIncoming className="h-5 w-5 text-blue-500" />,
      change: "+12%",
      isPositive: true
    },
    { 
      label: "Avg. Call Time",
      value: "4:15",
      icon: <Clock className="h-5 w-5 text-purple-500" />,
      change: "-0:30",
      isPositive: true
    },
    { 
      label: "Medications Verified",
      value: 48,
      icon: <Search className="h-5 w-5 text-green-500" />,
      change: "+18%",
      isPositive: true
    },
    { 
      label: "Active Patients",
      value: 156,
      icon: <User className="h-5 w-5 text-amber-500" />,
      change: "+8",
      isPositive: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Inbound Call Dashboard</h1>
            <p className="text-muted-foreground">
              Track and manage inbound calls from patients to pharmacists
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-muted-foreground">{stat.label}</div>
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className={`text-sm flex items-center ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                className="search-input pl-10 w-full lg:w-1/3"
                placeholder="Search by patient name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            {selectedCall ? (
              <CallDetails 
                call={selectedCall} 
                onClose={() => setSelectedCall(null)}
              />
            ) : (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">Recent Inbound Calls</h2>
                </div>
                <CallsTable 
                  calls={filteredCalls} 
                  onSelectCall={setSelectedCall} 
                  className="glass-card p-4"
                />
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
