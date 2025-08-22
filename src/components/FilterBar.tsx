import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

const FilterBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedType("");
    setSelectedAge("");
    setSearchQuery("");
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-custom-sm border">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Rechercher un stage..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Type de stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sport">Sport</SelectItem>
            <SelectItem value="art">Art & Créativité</SelectItem>
            <SelectItem value="science">Sciences</SelectItem>
            <SelectItem value="langue">Langues</SelectItem>
            <SelectItem value="nature">Nature & Aventure</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedAge} onValueChange={setSelectedAge}>
          <SelectTrigger>
            <SelectValue placeholder="Âge" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3-5">3-5 ans</SelectItem>
            <SelectItem value="6-8">6-8 ans</SelectItem>
            <SelectItem value="9-12">9-12 ans</SelectItem>
            <SelectItem value="13-15">13-15 ans</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vacances-paques">Vacances de Pâques</SelectItem>
            <SelectItem value="vacances-ete">Vacances d'été</SelectItem>
            <SelectItem value="vacances-automne">Vacances d'automne</SelectItem>
            <SelectItem value="weekends">Weekends</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Plus de filtres</span>
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm font-medium text-muted-foreground">Filtres actifs:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center space-x-1">
              <span>{filter}</span>
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Effacer tout
          </Button>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">24 stages</span> correspondent à votre recherche
      </div>
    </div>
  );
};

export default FilterBar;