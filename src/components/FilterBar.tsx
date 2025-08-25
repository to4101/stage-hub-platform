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
    <div className="w-full">
      {/* Unified Search Bar - Airbnb Style */}
      <div className="bg-card border border-border rounded-full shadow-lg p-2 flex items-center">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 divide-x divide-border">
          {/* Destination/Search */}
          <div className="px-6 py-3 cursor-pointer hover:bg-muted/50 transition-colors rounded-l-full">
            <div className="text-sm font-semibold text-foreground">Destination</div>
            <Input
              placeholder="Rechercher un stage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 p-0 h-auto text-sm text-muted-foreground bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground"
            />
          </div>

          {/* Type de stage */}
          <div className="px-6 py-3">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="border-0 p-0 h-auto bg-transparent focus:ring-0 hover:bg-muted/50 transition-colors">
                <div className="text-left">
                  <div className="text-sm font-semibold text-foreground">Type</div>
                  <SelectValue placeholder="Type de stage" className="text-sm text-muted-foreground" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sport">Sport</SelectItem>
                <SelectItem value="art">Art & Créativité</SelectItem>
                <SelectItem value="science">Sciences</SelectItem>
                <SelectItem value="langue">Langues</SelectItem>
                <SelectItem value="nature">Nature & Aventure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Âge */}
          <div className="px-6 py-3">
            <Select value={selectedAge} onValueChange={setSelectedAge}>
              <SelectTrigger className="border-0 p-0 h-auto bg-transparent focus:ring-0 hover:bg-muted/50 transition-colors">
                <div className="text-left">
                  <div className="text-sm font-semibold text-foreground">Âge</div>
                  <SelectValue placeholder="Âge de l'enfant" className="text-sm text-muted-foreground" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-5">3-5 ans</SelectItem>
                <SelectItem value="6-8">6-8 ans</SelectItem>
                <SelectItem value="9-12">9-12 ans</SelectItem>
                <SelectItem value="13-15">13-15 ans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Période */}
          <div className="px-6 py-3">
            <Select>
              <SelectTrigger className="border-0 p-0 h-auto bg-transparent focus:ring-0 hover:bg-muted/50 transition-colors rounded-r-full">
                <div className="text-left">
                  <div className="text-sm font-semibold text-foreground">Période</div>
                  <SelectValue placeholder="Quand ?" className="text-sm text-muted-foreground" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vacances-paques">Vacances de Pâques</SelectItem>
                <SelectItem value="vacances-ete">Vacances d'été</SelectItem>
                <SelectItem value="vacances-automne">Vacances d'automne</SelectItem>
                <SelectItem value="weekends">Weekends</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <Button 
          size="lg" 
          className="rounded-full w-12 h-12 p-0 ml-2 bg-primary hover:bg-primary/90 shrink-0"
        >
          <Search className="h-4 w-4 text-primary-foreground" />
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