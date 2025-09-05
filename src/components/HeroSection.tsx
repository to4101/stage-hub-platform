import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-stages.jpg";
import FilterBar from "@/components/FilterBar";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent to-secondary py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Trouvez le{" "}
                <span className="gradient-primary bg-clip-text text-transparent">
                  stage parfait
                </span>{" "}
                pour votre enfant
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Sport, art, sciences, nature... Découvrez et réservez facilement 
                les meilleurs stages de vacances en Belgique.
              </p>
            </div>

            {/* Integrated Search Bar */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-custom-xl border border-white/20">
              <FilterBar />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="lg" className="border-white/30 text-muted-foreground hover:bg-white/10">
                Comment ça marche ?
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Stages disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Organisations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Enfants ravis</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-custom-xl">
              <img 
                src={heroImage} 
                alt="Enfants participant à des activités de stage"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-card p-4 rounded-lg shadow-custom-md border">
              <div className="text-sm font-medium text-success">✓ Réservation sécurisée</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-lg shadow-custom-md border">
              <div className="text-sm font-medium text-primary">🎨 Activités variées</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;