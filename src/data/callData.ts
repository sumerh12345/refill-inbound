
import { Call } from "@/components/ui/CallsTable";

// Mock call data - calls linked to patients
export const callHistory: Call[] = [
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
