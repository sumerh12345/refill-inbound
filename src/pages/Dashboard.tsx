
import React, { useState, useEffect } from "react";
import { PhoneIncoming, Search, Clock, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CallsTable, { Call } from "@/components/ui/CallsTable";
import CallDetails from "@/components/ui/CallDetails";
import { fetchRetellCalls } from "@/services/retellService";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [calls, setCalls] = useState<Call[]>([]);
  const { toast } = useToast();
  
  // Fetch calls from Retell API
  useEffect(() => {
    const loadCalls = async () => {
      setIsLoading(true);
      try {
        const callsData = await fetchRetellCalls();
        setCalls(callsData);
      } catch (error) {
        console.error("Failed to load calls:", error);
        toast({
          title: "Error loading calls",
          description: "Could not fetch call data from the server",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCalls();
  }, [toast]);
  
  const filteredCalls = searchTerm
    ? calls.filter(call => 
        call.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.patientId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : calls;
    
  const stats = [
    { 
      label: "Today's Calls",
      value: calls.filter(call => {
        const today = new Date();
        const callDate = new Date(call.timestamp);
        return callDate.getDate() === today.getDate() &&
               callDate.getMonth() === today.getMonth() &&
               callDate.getFullYear() === today.getFullYear();
      }).length,
      icon: <PhoneIncoming className="h-5 w-5 text-blue-500" />,
      change: "+12%",
      isPositive: true
    },
    { 
      label: "Avg. Call Time",
      value: (() => {
        if (calls.length === 0) return "0:00";
        const totalSeconds = calls.reduce((sum, call) => sum + call.duration, 0);
        const avgSeconds = Math.floor(totalSeconds / calls.length);
        const mins = Math.floor(avgSeconds / 60);
        const secs = avgSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
      })(),
      icon: <Clock className="h-5 w-5 text-purple-500" />,
      change: "-0:30",
      isPositive: true
    },
    { 
      label: "Medications Verified",
      value: calls.reduce((count, call) => count + (call.medications?.length || 0), 0),
      icon: <Search className="h-5 w-5 text-green-500" />,
      change: "+18%",
      isPositive: true
    },
    { 
      label: "Active Patients",
      value: [...new Set(calls.map(call => call.patientId))].length,
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
                {isLoading && (
                  <div className="text-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading call data...</p>
                  </div>
                )}
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
