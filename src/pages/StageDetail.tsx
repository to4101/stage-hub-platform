import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import AccordionRegistration from "@/components/AccordionRegistration";

// Mock data - remplacer par des données réelles
const stageData = {
  id: "1",
  title: "Stage Football Technique",
  image: "/src/assets/stage-sport.jpg",
  description: `
    <p>Venez découvrir les joies du football lors de ce stage intensif de technique et de tactique.</p>
    <p>Nos moniteurs expérimentés accompagneront votre enfant dans l'apprentissage des gestes techniques de base : contrôle, passe, tir, dribble.</p>
    <ul>
      <li>Entraînements techniques quotidiens</li>
      <li>Mini-tournois et matchs amicaux</li>
      <li>Initiation aux règles du jeu</li>
      <li>Matériel fourni (ballons, chasubles)</li>
    </ul>
    <p>Une semaine inoubliable pour progresser tout en s'amusant !</p>
  `,
  type: "Sport",
  ageMin: 8,
  ageMax: 12,
  sessions: [
    {
      id: "s1",
      startDate: "2024-07-08",
      endDate: "2024-07-12",
      location: "Complexe sportif de Visé",
      capacity: 20,
      spotsLeft: 7,
      basePrice: 120
    },
    {
      id: "s2", 
      startDate: "2024-07-15",
      endDate: "2024-07-19",
      location: "Complexe sportif de Visé",
      capacity: 20,
      spotsLeft: 12,
      basePrice: 120
    },
    {
      id: "s3",
      startDate: "2024-08-19",
      endDate: "2024-08-23", 
      location: "Complexe sportif de Visé",
      capacity: 20,
      spotsLeft: 0,
      basePrice: 120
    }
  ],
  options: [
    {
      id: "garderie",
      label: "Garderie matinale",
      description: "Accueil dès 7h30 au lieu de 9h00",
      impact: 25,
      required: false
    },
    {
      id: "repas",
      label: "Repas chauds",
      description: "Repas équilibré fourni chaque midi",
      impact: 35,
      required: false
    },
    {
      id: "assurance",
      label: "Assurance annulation",
      description: "Protection en cas d'annulation de dernière minute",
      impact: 15,
      required: false
    },
    {
      id: "domicile-vise",
      label: "Domicilié à Visé",
      description: "Remise pour les résidents de Visé",
      impact: -15,
      required: false
    }
  ]
};

const StageDetail = () => {
  const { id } = useParams();
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [childData, setChildData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    notes: "",
    parentPhone: ""
  });

  const calculatePrice = () => {
    const session = stageData.sessions.find(s => s.id === selectedSession);
    if (!session) return 0;
    
    const basePrice = session.basePrice;
    const optionsTotal = selectedOptions.reduce((total, optionId) => {
      const option = stageData.options.find(opt => opt.id === optionId);
      return total + (option?.impact || 0);
    }, 0);
    
    return basePrice + optionsTotal;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour au catalogue</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Informations du stage */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-xl shadow-custom-lg">
              <img 
                src={stageData.image} 
                alt={stageData.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-background/90">
                  {stageData.type}
                </Badge>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4 gradient-text">
                {stageData.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{stageData.ageMin}-{stageData.ageMax} ans</span>
                </div>
              </div>

              <div 
                className="prose prose-sm max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: stageData.description }}
              />
            </div>

          </div>

          {/* Formulaire d'inscription */}
          <div className="space-y-6">
            <AccordionRegistration
              sessions={stageData.sessions}
              options={stageData.options}
              selectedSession={selectedSession}
              setSelectedSession={setSelectedSession}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              childData={childData}
              setChildData={setChildData}
              calculatePrice={calculatePrice}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StageDetail;