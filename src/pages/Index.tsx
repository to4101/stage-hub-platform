import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import StageCard from "@/components/StageCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import images
import stageSport from "@/assets/stage-sport.jpg";
import stageArt from "@/assets/stage-art.jpg";
import stageScience from "@/assets/stage-science.jpg";
import stageNature from "@/assets/stage-nature.jpg";

const mockStages = [
  {
    id: "1",
    title: "Stage Multi-Sports",
    description: "Football, basketball, natation et bien plus ! Un programme complet pour découvrir différents sports dans la bonne humeur.",
    image: stageSport,
    type: "Sport",
    ageRange: "6-12 ans",
    location: "Bruxelles",
    nextSession: "15-19 Juil",
    spotsLeft: 8,
    price: 120,
    available: true
  },
  {
    id: "2",
    title: "Atelier Créatif & Arts",
    description: "Peinture, sculpture, bricolage... Laissez libre cours à la créativité de vos enfants avec nos animateurs artistiques.",
    image: stageArt,
    type: "Art & Créativité",
    ageRange: "4-10 ans",
    location: "Liège",
    nextSession: "22-26 Juil",
    spotsLeft: 3,
    price: 95,
    available: true
  },
  {
    id: "3",
    title: "Petit Scientifique",
    description: "Expériences amusantes, découverte de la nature et initiation à la science. L'apprentissage par le jeu !",
    image: stageScience,
    type: "Sciences",
    ageRange: "7-14 ans",
    location: "Gand",
    nextSession: "29 Juil-2 Août",
    spotsLeft: 0,
    price: 140,
    available: false
  },
  {
    id: "4",
    title: "Aventure Nature",
    description: "Randonnées, observation de la faune, jeux en pleine nature. Une semaine d'aventure en plein air !",
    image: stageNature,
    type: "Nature & Aventure",
    ageRange: "8-15 ans",
    location: "Ardennes",
    nextSession: "5-9 Août",
    spotsLeft: 12,
    price: 180,
    available: true
  },
  {
    id: "5",
    title: "Stage Multi-Sports Avancé",
    description: "Pour les sportifs confirmés ! Perfectionnement technique et découverte de sports plus exigeants.",
    image: stageSport,
    type: "Sport",
    ageRange: "10-16 ans",
    location: "Anvers",
    nextSession: "12-16 Août",
    spotsLeft: 6,
    price: 150,
    available: true
  },
  {
    id: "6",
    title: "Créations Numériques",
    description: "Initiation à la programmation, création de jeux vidéo simples et découverte du monde digital.",
    image: stageScience,
    type: "Sciences",
    ageRange: "9-15 ans",
    location: "Namur",
    nextSession: "19-23 Août",
    spotsLeft: 15,
    price: 165,
    available: true
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Search Section - Primary Focus */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Trouvez le stage parfait
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez une sélection variée de stages de qualité pour tous les âges et tous les goûts
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <FilterBar />
            </div>
          </div>
        </section>

        <HeroSection />
        
        {/* Catalogue Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Stages disponibles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {mockStages.map((stage) => (
                <StageCard key={stage.id} {...stage} />
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" className="group">
                Voir plus de stages
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 gradient-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Qualité garantie</h3>
                <p className="text-muted-foreground">
                  Toutes nos organisations partenaires sont certifiées et respectent les normes de sécurité les plus strictes.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Paiement sécurisé</h3>
                <p className="text-muted-foreground">
                  Paiements en ligne sécurisés avec Bancontact. Remboursement garanti en cas d'annulation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Support familial</h3>
                <p className="text-muted-foreground">
                  Notre équipe vous accompagne avant, pendant et après le stage pour une expérience parfaite.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Prêt à offrir une expérience inoubliable ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de familles qui font confiance à StageHub pour les vacances de leurs enfants.
            </p>
            <Button size="lg" className="gradient-primary hover:opacity-90 transition-smooth">
              Commencer maintenant
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 gradient-primary bg-clip-text text-transparent">
                StageHub
              </h3>
              <p className="text-muted-foreground">
                La plateforme de référence pour les stages de vacances en Belgique.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-smooth">Catalogue</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Comment ça marche</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-smooth">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Aide</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Conditions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Organisations</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-smooth">Devenir partenaire</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Espace pro</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Tarifs</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 StageHub. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;