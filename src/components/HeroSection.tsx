import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-stages.jpg";
import FilterBar from "@/components/FilterBar";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 gradient-hero"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-32 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      
      {/* Hero image on the right */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <div className="relative h-full">
          <img 
            src={heroImage} 
            alt="Enfants participant à des activités de stage"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl">
          <div className="space-y-12">
            {/* Main content with enhanced animations */}
            <div className="space-y-8 animate-fade-up">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium shadow-glow">
                <span className="animate-pulse mr-2">✨</span>
                Plus de 500 stages disponibles cet été
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight">
                Trouvez le{" "}
                <span className="gradient-primary bg-clip-text text-transparent relative">
                  stage parfait
                  <div className="absolute -inset-1 gradient-primary opacity-20 blur-lg -z-10"></div>
                </span>{" "}
                <br className="hidden sm:block" />
                pour votre enfant
              </h1>
              
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl font-light">
                Sport, art, sciences, nature... Découvrez et réservez en quelques clics 
                les meilleurs stages de vacances certifiés en Belgique.
              </p>
            </div>

            {/* Enhanced Search Bar with better visual hierarchy */}
            <div className="animate-scale-up" style={{animationDelay: '0.3s'}}>
              <div className="bg-card/90 backdrop-blur-2xl rounded-3xl p-8 shadow-custom-xl border border-border/30 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.02]"></div>
                
                <div className="relative">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Recherchez votre stage idéal
                    </h3>
                    <p className="text-muted-foreground font-light">
                      Filtrez par type d'activité, tranche d'âge, localisation et période
                    </p>
                  </div>
                  <FilterBar />
                </div>
              </div>
            </div>

            {/* Enhanced trust indicators with better spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 animate-fade-up" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20 transition-smooth hover:shadow-custom-md">
                <div className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-success text-lg">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Paiement 100% sécurisé</div>
                  <div className="text-sm text-muted-foreground">Bancontact, Visa & Mastercard</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20 transition-smooth hover:shadow-custom-md">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-lg">🛡️</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Organisations certifiées</div>
                  <div className="text-sm text-muted-foreground">Qualité et sécurité garanties</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20 transition-smooth hover:shadow-custom-md">
                <div className="w-12 h-12 bg-gradient-to-br from-warning/20 to-warning/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-warning text-lg">⭐</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">10k+ familles satisfaites</div>
                  <div className="text-sm text-muted-foreground">Note moyenne: 4.8/5 étoiles</div>
                </div>
              </div>
            </div>

            {/* Call to action hint */}
            <div className="text-center pt-8 animate-fade-up" style={{animationDelay: '0.9s'}}>
              <p className="text-muted-foreground text-sm font-light">
                ↓ Découvrez nos stages populaires ci-dessous
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced floating cards for mobile */}
      <div className="lg:hidden absolute top-24 right-6 bg-card/95 backdrop-blur-xl p-4 rounded-2xl shadow-custom-lg border border-border/30 animate-float">
        <div className="text-sm font-medium text-success flex items-center gap-2">
          <span className="w-2 h-2 bg-success rounded-full"></span>
          Réservation sécurisée
        </div>
      </div>
      <div className="lg:hidden absolute bottom-32 left-6 bg-card/95 backdrop-blur-xl p-4 rounded-2xl shadow-custom-lg border border-border/30 animate-float" style={{animationDelay: '3s'}}>
        <div className="text-sm font-medium text-primary flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          500+ activités
        </div>
      </div>
    </section>
  );
};

export default HeroSection;