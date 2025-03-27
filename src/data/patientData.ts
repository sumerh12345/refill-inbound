
export interface Patient {
  id: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  insuranceId: string;
  medicareEligible: boolean;
}

// Mock patient data
export const patientData: Patient[] = [
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
