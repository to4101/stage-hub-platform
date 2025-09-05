import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-stages.jpg";
import FilterBar from "@/components/FilterBar";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background with enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"></div>
      
      {/* Hero image on the right */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <div className="relative h-full">
          <img 
            src={heroImage} 
            alt="Enfants participant à des activités de stage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="space-y-8">
            {/* Main content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                ✨ Plus de 500 stages disponibles
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Trouvez le{" "}
                <span className="gradient-primary bg-clip-text text-transparent">
                  stage parfait
                </span>{" "}
                pour votre enfant
              </h1>
              
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Sport, art, sciences, nature... Découvrez et réservez facilement 
                les meilleurs stages de vacances en Belgique.
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 shadow-custom-xl border border-border/50">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">Recherchez votre stage idéal</h3>
                <p className="text-sm text-muted-foreground">Filtrez par type, âge, lieu et période</p>
              </div>
              <FilterBar />
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <span className="text-success text-sm">✓</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Paiement sécurisé</div>
                  <div className="text-xs text-muted-foreground">Bancontact & Visa</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm">🛡️</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Organisations certifiées</div>
                  <div className="text-xs text-muted-foreground">Qualité garantie</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                  <span className="text-warning text-sm">⭐</span>
                </div>
                <div>
                  <div className="text-sm font-medium">10k+ familles satisfaites</div>
                  <div className="text-xs text-muted-foreground">Note moyenne: 4.8/5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating cards for mobile */}
      <div className="lg:hidden absolute top-20 right-4 bg-card/90 backdrop-blur-sm p-3 rounded-xl shadow-custom-md border">
        <div className="text-xs font-medium text-success">✓ Réservation sécurisée</div>
      </div>
      <div className="lg:hidden absolute bottom-20 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-xl shadow-custom-md border">
        <div className="text-xs font-medium text-primary">🎨 500+ activités</div>
      </div>
    </section>
  );
};

export default HeroSection;