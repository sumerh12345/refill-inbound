
import { Call } from "@/components/ui/CallsTable";
import { CallCategory } from "@/components/ui/CallCategoryBadge";

// API constants
const RETELL_API_KEY = "key_c96f71c4b1304dcf92468c69b1b8";
const RETELL_AGENT_ID = "agent_21813ad7d3c29c8031ab85a6d7";
const RETELL_API_URL = "https://api.retellai.com";

interface RetellCallResponse {
  calls: RetellCall[];
  // Other fields from API response as needed
}

interface RetellCall {
  id: string;
  patient_name?: string;
  patient_id?: string;
  created_at: string;
  duration_seconds?: number;
  call_type?: string;
  medications?: string[];
  notes?: string;
  status?: string;
  // Add other fields as they appear in the API response
}

// Map Retell call categories to our app's categories
const mapCallCategory = (callType: string | undefined): CallCategory => {
  if (!callType) return "general";
  
  if (callType.includes("medication") || callType.includes("med")) return "medication-question";
  if (callType.includes("prescription") || callType.includes("refill")) return "new-prescription";
  if (callType.includes("insurance")) return "insurance-inquiry";
  if (callType.includes("side") || callType.includes("effect")) return "side-effects";
  
  return "general";
};

// Map Retell call status to our app's status
const mapCallStatus = (status: string | undefined): "completed" | "in-progress" | "needs-followup" => {
  if (!status) return "completed";
  
  if (status.includes("complete")) return "completed";
  if (status.includes("progress") || status.includes("ongoing")) return "in-progress";
  if (status.includes("follow") || status.includes("pending")) return "needs-followup";
  
  return "completed";
};

// For debugging - Generate mock data if the API call fails
const generateMockCalls = (count: number): Call[] => {
  const categories: CallCategory[] = ["medication-question", "new-prescription", "insurance-inquiry", "side-effects", "general"];
  const statuses: ("completed" | "in-progress" | "needs-followup")[] = ["completed", "in-progress", "needs-followup"];
  
  return Array.from({ length: count }).map((_, index) => ({
    id: `mock-${index}`,
    patientName: `Patient ${index + 1}`,
    patientId: `P${Math.floor(Math.random() * 100000)}`,
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 30), // Random date in the last 30 days
    duration: Math.floor(Math.random() * 600), // 0-10 minutes
    category: categories[Math.floor(Math.random() * categories.length)],
    medications: Array.from({ length: Math.floor(Math.random() * 3) }).map((_, i) => `Medication ${i + 1}`),
    notes: `Mock note for call ${index + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }));
};

// Fetch calls from Retell API
export const fetchRetellCalls = async (): Promise<Call[]> => {
  try {
    // Updated endpoint based on the 404 error in the console logs
    // The endpoint structure may need to be /v1/calls?agent_id=agent_id instead
    const response = await fetch(`${RETELL_API_URL}/v1/calls?agent_id=${RETELL_AGENT_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch calls: ${response.status}`);
      if (response.status === 404) {
        console.error("API endpoint not found. Check the Retell API documentation for the correct endpoint.");
      }
      console.log("Generating mock data for development");
      return generateMockCalls(10);
    }

    const data: RetellCallResponse = await response.json();
    console.log("API Response:", data); // Log the actual API response for debugging
    
    // Map Retell calls to our Call interface
    return data.calls.map(call => ({
      id: call.id,
      patientName: call.patient_name || "Unknown Patient",
      patientId: call.patient_id || `P${Math.floor(Math.random() * 100000)}`,
      timestamp: new Date(call.created_at),
      duration: call.duration_seconds || 0,
      category: mapCallCategory(call.call_type),
      medications: call.medications || [],
      notes: call.notes || "",
      status: mapCallStatus(call.status)
    }));
  } catch (error) {
    console.error("Error fetching Retell calls:", error);
    // Return mock data for development/debugging
    return generateMockCalls(10);
  }
};

// Fetch a single call by ID (for call details)
export const fetchRetellCallById = async (callId: string): Promise<Call | null> => {
  try {
    const response = await fetch(`${RETELL_API_URL}/v1/calls/${callId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch call: ${response.status}`);
    }

    const call: RetellCall = await response.json();
    
    return {
      id: call.id,
      patientName: call.patient_name || "Unknown Patient",
      patientId: call.patient_id || `P${Math.floor(Math.random() * 100000)}`,
      timestamp: new Date(call.created_at),
      duration: call.duration_seconds || 0,
      category: mapCallCategory(call.call_type),
      medications: call.medications || [],
      notes: call.notes || "",
      status: mapCallStatus(call.status)
    };
  } catch (error) {
    console.error("Error fetching Retell call:", error);
    return null;
  }
};
