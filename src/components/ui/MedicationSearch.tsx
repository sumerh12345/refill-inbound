
import React, { useState, useEffect } from "react";
import { Search, X, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { checkMedicationCoverage } from "@/lib/medicationUtils";

interface MedicationSearchProps {
  onResultsFound?: (results: any) => void;
  className?: string;
}

const MedicationSearch = ({ onResultsFound, className }: MedicationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<any | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (searchTerm.length > 2) {
      setIsSearching(true);
      
      // Simulate API search with debounce
      timeoutId = setTimeout(() => {
        const results = checkMedicationCoverage(searchTerm);
        setSearchResults(results);
        setIsSearching(false);
        
        if (onResultsFound) {
          onResultsFound(results);
        }
      }, 600);
    } else {
      setSearchResults([]);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [searchTerm, onResultsFound]);

  const handleSelectMedication = (medication: any) => {
    setSelectedMedication(medication);
    setSearchTerm("");
    setSearchResults([]);
  };

  const clearSelection = () => {
    setSelectedMedication(null);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <input
          type="text"
          className="search-input pl-10"
          placeholder="Search for a medication..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={!!selectedMedication}
        />
        
        {isSearching && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}
      </div>
      
      {searchResults.length > 0 && (
        <div className="mt-2 glass-card p-2 max-h-60 overflow-y-auto">
          <ul className="divide-y divide-border">
            {searchResults.map((result) => (
              <li 
                key={result.id}
                className="py-2 px-3 hover:bg-accent rounded-md cursor-pointer transition-colors"
                onClick={() => handleSelectMedication(result)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{result.name}</p>
                    <p className="text-sm text-muted-foreground">{result.dosage}</p>
                  </div>
                  <div className={cn(
                    "pill",
                    result.covered ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  )}>
                    {result.covered ? "Covered" : "Not Covered"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {selectedMedication && (
        <div className="mt-4 glass-card p-4 animate-fade-in">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{selectedMedication.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedMedication.dosage}</p>
            </div>
            <button 
              onClick={clearSelection}
              className="p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="mt-4 flex items-center">
            {selectedMedication.covered ? (
              <>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-600">Medicare Covered</p>
                  <p className="text-sm text-muted-foreground">This medication is covered by Medicare</p>
                </div>
              </>
            ) : (
              <>
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-red-600">Not Covered by Medicare</p>
                  <p className="text-sm text-muted-foreground">Alternative options may be available</p>
                </div>
              </>
            )}
          </div>
          
          {selectedMedication.restrictions && (
            <div className="mt-4 p-3 bg-amber-50 rounded-md border border-amber-200">
              <p className="text-sm text-amber-800">
                <span className="font-medium">Restrictions:</span> {selectedMedication.restrictions}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicationSearch;
