
import React from "react";
import { Search, Plus, Filter, Download } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export type FilterOption = "all" | "medicare" | "non-medicare";

interface PatientSearchProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  filterValue: FilterOption;
  onFilterChange: (value: FilterOption) => void;
}

const PatientSearch = ({ 
  searchTerm, 
  onSearchChange, 
  filterValue, 
  onFilterChange 
}: PatientSearchProps) => {
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-input bg-background hover:bg-accent transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Medicare Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={filterValue} onValueChange={(value) => onFilterChange(value as FilterOption)}>
              <DropdownMenuRadioItem value="all" className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-4 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                All Patients
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="medicare" className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-4 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                Medicare Eligible
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="non-medicare" className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-4 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                Not Medicare Eligible
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-input bg-background hover:bg-accent transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>
    </div>
  );
};

export default PatientSearch;
