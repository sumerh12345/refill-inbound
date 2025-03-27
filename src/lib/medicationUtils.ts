
// This is a simplified mock of the medication database
// In a real application, this would connect to an API or database
// that contains the full Medicare coverage information

interface Medication {
  id: string;
  name: string;
  dosage: string;
  covered: boolean;
  restrictions?: string;
}

// Mock medication database
const medicationDatabase: Medication[] = [
  {
    id: "med1",
    name: "Atorvastatin",
    dosage: "10mg Tablet",
    covered: true
  },
  {
    id: "med2",
    name: "Atorvastatin",
    dosage: "20mg Tablet",
    covered: true
  },
  {
    id: "med3",
    name: "Lisinopril",
    dosage: "10mg Tablet",
    covered: true
  },
  {
    id: "med4",
    name: "Lisinopril",
    dosage: "20mg Tablet",
    covered: true
  },
  {
    id: "med5",
    name: "Metformin",
    dosage: "500mg Tablet",
    covered: true
  },
  {
    id: "med6",
    name: "Metformin",
    dosage: "1000mg Tablet",
    covered: true
  },
  {
    id: "med7",
    name: "Levothyroxine",
    dosage: "50mcg Tablet",
    covered: true
  },
  {
    id: "med8",
    name: "Levothyroxine",
    dosage: "100mcg Tablet",
    covered: true
  },
  {
    id: "med9",
    name: "Amlodipine",
    dosage: "5mg Tablet",
    covered: true
  },
  {
    id: "med10",
    name: "Amlodipine",
    dosage: "10mg Tablet",
    covered: true
  },
  {
    id: "med11",
    name: "Simvastatin",
    dosage: "20mg Tablet",
    covered: true
  },
  {
    id: "med12",
    name: "Omeprazole",
    dosage: "20mg Capsule",
    covered: true,
    restrictions: "Prior authorization required for quantities exceeding 30 capsules per 30 days."
  },
  {
    id: "med13",
    name: "Azithromycin",
    dosage: "250mg Tablet",
    covered: true,
    restrictions: "Limited to 10 tablets per prescription."
  },
  {
    id: "med14",
    name: "Humira",
    dosage: "40mg/0.8mL Pen",
    covered: false
  },
  {
    id: "med15",
    name: "Eliquis",
    dosage: "5mg Tablet",
    covered: true,
    restrictions: "Requires prior authorization."
  },
  {
    id: "med16",
    name: "Jardiance",
    dosage: "10mg Tablet",
    covered: true,
    restrictions: "Patient must have documented Type 2 diabetes."
  },
  {
    id: "med17",
    name: "Xarelto",
    dosage: "20mg Tablet",
    covered: false
  },
  {
    id: "med18",
    name: "Ozempic",
    dosage: "1mg/0.75mL Pen",
    covered: false
  },
  {
    id: "med19",
    name: "Trulicity",
    dosage: "1.5mg/0.5mL Pen",
    covered: true,
    restrictions: "Limited to patients with Type 2 diabetes who have failed metformin therapy."
  },
  {
    id: "med20",
    name: "Entresto",
    dosage: "97/103mg Tablet",
    covered: true,
    restrictions: "Limited to patients with documented heart failure with reduced ejection fraction."
  }
];

// Function to search medications by name
export const checkMedicationCoverage = (searchTerm: string): Medication[] => {
  if (!searchTerm || searchTerm.length < 3) return [];
  
  const normalizedSearch = searchTerm.toLowerCase();
  
  return medicationDatabase.filter(med => 
    med.name.toLowerCase().includes(normalizedSearch) ||
    med.dosage.toLowerCase().includes(normalizedSearch)
  );
};

// Function to get a specific medication by ID
export const getMedicationById = (id: string): Medication | undefined => {
  return medicationDatabase.find(med => med.id === id);
};

// Function to check if a medication is covered by Medicare
export const isMedicationCovered = (medicationName: string, dosage?: string): boolean => {
  const medications = medicationDatabase.filter(
    med => med.name.toLowerCase() === medicationName.toLowerCase()
  );
  
  if (dosage) {
    const exactMatch = medications.find(
      med => med.dosage.toLowerCase() === dosage.toLowerCase()
    );
    return exactMatch ? exactMatch.covered : false;
  }
  
  // If no dosage specified, check if any version of the medication is covered
  return medications.some(med => med.covered);
};

// Function to get medication restrictions
export const getMedicationRestrictions = (medicationId: string): string | undefined => {
  const medication = getMedicationById(medicationId);
  return medication?.restrictions;
};

// Export mock data for testing
export const getMockMedications = () => medicationDatabase;
