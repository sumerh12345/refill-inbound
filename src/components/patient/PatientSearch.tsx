
import React from "react";
import { Search, Plus, Filter, Download } from "lucide-react";

interface PatientSearchProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

const PatientSearch = ({ searchTerm, onSearchChange }: PatientSearchProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="search-input pl-10"
          placeholder="Search patients by name, ID, or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </button>
        <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-input bg-background hover:bg-accent transition-colors">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
        <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-input bg-background hover:bg-accent transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>
    </div>
  );
};

export default PatientSearch;
