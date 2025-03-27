
import React, { useState } from "react";
import { PhoneIncoming, Search, Clock, User, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MedicationSearch from "@/components/ui/MedicationSearch";
import CallLog from "@/components/ui/CallLog";

const Dashboard = () => {
  const [activeCallData, setActiveCallData] = useState<any>(null);
  
  // Mock data for demo purposes
  const recentCalls = [
    {
      id: "call1",
      patientName: "John Smith",
      patientId: "P12345",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      duration: 325, // 5 minutes 25 seconds
      medications: ["Atorvastatin", "Lisinopril"],
      status: "completed" as const
    },
    {
      id: "call2",
      patientName: "Emma Johnson",
      patientId: "P23456",
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      duration: 187, // 3 minutes 7 seconds
      medications: ["Metformin"],
      status: "completed" as const
    },
    {
      id: "call3",
      patientName: "Michael Brown",
      patientId: "P34567",
      timestamp: new Date(Date.now() - 120 * 60 * 1000), // 2 hours ago
      duration: 412, // 6 minutes 52 seconds
      medications: ["Omeprazole", "Azithromycin"],
      status: "completed" as const
    },
    {
      id: "call4",
      patientName: "Sarah Davis",
      patientId: "P45678",
      timestamp: new Date(Date.now() - 5000), // Just now
      duration: 85, // 1 minute 25 seconds so far
      status: "in-progress" as const
    }
  ];
  
  const handleActiveCall = (call: any) => {
    setActiveCallData(call);
  };
  
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
            <h1 className="text-3xl font-bold mb-2">Call Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor incoming calls and verify medications in real-time
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Call Section */}
            <div className="glass-card p-6 lg:col-span-2 animate-fade-in">
              <h2 className="section-heading mb-4">
                {activeCallData ? "Active Call" : "Start a New Call"}
              </h2>
              
              {activeCallData ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <PhoneIncoming className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{activeCallData.patientName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Started {format(activeCallData.timestamp, "h:mm a")} · 
                        Patient ID: {activeCallData.patientId}
                      </p>
                    </div>
                    
                    <div className="ml-auto">
                      <div className="pill bg-blue-100 text-blue-800">
                        {activeCallData.status === "in-progress" ? "In Progress" : "Completed"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-accent/50">
                    <h4 className="font-medium mb-2">Medication Verification</h4>
                    <MedicationSearch />
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      onClick={() => setActiveCallData(null)}
                      className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent transition-colors"
                    >
                      End Call
                    </button>
                    
                    <button 
                      className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    When you receive an inbound call, select it from the recent calls list or create a new call.
                  </p>
                  
                  <div className="p-4 rounded-lg bg-accent/50">
                    <h4 className="font-medium mb-2">Quick Medication Lookup</h4>
                    <MedicationSearch />
                  </div>
                  
                  <button 
                    className="w-full px-4 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    onClick={() => handleActiveCall(recentCalls[3])}
                  >
                    Start New Call
                  </button>
                </div>
              )}
            </div>
            
            {/* Recent Calls */}
            <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CallLog 
                calls={recentCalls} 
                onSelectCall={handleActiveCall}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
