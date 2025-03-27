import React, { useState, useEffect } from "react";
import { PhoneIncoming, Search, Clock, User, RefreshCw } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CallsTable, { Call } from "@/components/ui/CallsTable";
import CallDetails from "@/components/ui/CallDetails";
import { fetchRetellCalls } from "@/services/retellService";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Dashboard = () => {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [calls, setCalls] = useState<Call[]>([]);
  const [debugResponse, setDebugResponse] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  
  // Fetch calls from Retell API
  const loadCalls = async () => {
    setIsLoading(true);
    try {
      const callsData = await fetchRetellCalls();
      setCalls(callsData);
      
      // Store the response for debugging with more detailed information
      const isMockData = callsData.some(call => call.id.startsWith('mock-'));
      setDebugResponse(
        `Data Source: ${isMockData ? 'MOCK DATA' : 'API RESPONSE'}\n` +
        `Timestamp: ${new Date().toISOString()}\n` +
        `Call Count: ${callsData.length}\n\n` +
        JSON.stringify(callsData, null, 2)
      );
      
      if (isMockData) {
        toast({
          title: "Using mock data",
          description: "Could not connect to Retell API. Using mock data instead.",
          variant: "warning",
        });
      } else {
        toast({
          title: "Data loaded",
          description: "Successfully fetched call data from Retell API.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Failed to load calls:", error);
      setDebugResponse(`Error: ${error instanceof Error ? error.message : String(error)}`);
      toast({
        title: "Error loading calls",
        description: "Could not fetch call data from the server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  
  useEffect(() => {
    loadCalls();
  }, []);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    loadCalls();
  };
  
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
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Inbound Call Dashboard</h1>
              <p className="text-muted-foreground">
                Track and manage inbound calls from patients to pharmacists
              </p>
            </div>
            <Button 
              onClick={handleRefresh} 
              className="flex items-center gap-2"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Calls'}
            </Button>
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
          
          {/* Debug Response Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Debug Response {calls.some(call => call.id.startsWith('mock-')) ? "(Using Mock Data)" : "(Live API Data)"}</h3>
            <Textarea 
              value={debugResponse} 
              readOnly 
              className="font-mono text-xs h-40" 
            />
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
                  isLoading={isLoading}
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
