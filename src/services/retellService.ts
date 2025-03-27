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

// Fetch calls from Retell API
export const fetchRetellCalls = async (): Promise<Call[]> => {
  try {
    const response = await fetch(`${RETELL_API_URL}/v1/agents/${RETELL_AGENT_ID}/calls`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch calls: ${response.status}`);
    }

    const data: RetellCallResponse = await response.json();
    
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
    return [];
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
