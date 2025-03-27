
import React, { useState } from "react";
import { Search, FileText, DownloadCloud } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MedicationSearch from "@/components/ui/MedicationSearch";
import { getMockMedications } from "@/lib/medicationUtils";

const Medication = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  const handleResultsFound = (results: any[]) => {
    setSearchResults(results);
  };
  
  // Mock statistics
  const stats = [
    { label: "Total Medications", value: getMockMedications().length },
    { label: "Medicare Covered", value: getMockMedications().filter(med => med.covered).length },
    { label: "With Restrictions", value: getMockMedications().filter(med => med.restrictions).length }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Medication Lookup</h1>
            <p className="text-muted-foreground">
              Verify Medicare coverage for medications
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-muted-foreground mb-2">{stat.label}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Search Section */}
            <div className="glass-card p-6 animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Medicare Coverage Verification</h2>
                <p className="text-muted-foreground">
                  Search for medications to check Medicare coverage status
                </p>
              </div>
              
              <MedicationSearch onResultsFound={handleResultsFound} />
              
              <div className="mt-8 flex items-center justify-between p-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Data sourced from Medicare Formulary
                  </p>
                </div>
                <div className="flex items-center">
                  <button className="inline-flex items-center text-sm text-primary hover:text-primary/80">
                    <FileText className="h-4 w-4 mr-1" />
                    View full list
                  </button>
                </div>
              </div>
            </div>
            
            {/* Resources Section */}
            <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
              <div className="glass-card p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Medicare Resources</h3>
                
                <div className="space-y-4">
                  <a 
                    href="https://www.medi-calrx.dhcs.ca.gov/cms/medicalrx/static-assets/documents/provider/forms-and-information/cdl/Medi-Cal_Rx_Contract_Drugs_List_FINAL.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <DownloadCloud className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Medi-Cal Rx Contract Drugs List</h4>
                      <p className="text-sm text-muted-foreground">
                        Official PDF document listing all covered medications
                      </p>
                    </div>
                  </a>
                  
                  <a 
                    href="#"
                    className="flex items-start p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Medicare Coverage Guidelines</h4>
                      <p className="text-sm text-muted-foreground">
                        Understanding coverage rules and restrictions
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">Coverage Statistics</h3>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Covered Medications</span>
                      <span className="text-sm font-medium">
                        {Math.round((getMockMedications().filter(med => med.covered).length / getMockMedications().length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${(getMockMedications().filter(med => med.covered).length / getMockMedications().length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">With Restrictions</span>
                      <span className="text-sm font-medium">
                        {Math.round((getMockMedications().filter(med => med.restrictions).length / getMockMedications().length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2.5">
                      <div 
                        className="bg-amber-500 h-2.5 rounded-full" 
                        style={{ width: `${(getMockMedications().filter(med => med.restrictions).length / getMockMedications().length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Not Covered</span>
                      <span className="text-sm font-medium">
                        {Math.round((getMockMedications().filter(med => !med.covered).length / getMockMedications().length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2.5">
                      <div 
                        className="bg-destructive h-2.5 rounded-full" 
                        style={{ width: `${(getMockMedications().filter(med => !med.covered).length / getMockMedications().length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Medication;
