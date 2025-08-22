import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, MapPin, Euro, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";

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
      location: "Complexe sportif de Waterloo",
      capacity: 20,
      spotsLeft: 7,
      basePrice: 120
    },
    {
      id: "s2", 
      startDate: "2024-07-15",
      endDate: "2024-07-19",
      location: "Complexe sportif de Waterloo",
      capacity: 20,
      spotsLeft: 12,
      basePrice: 120
    },
    {
      id: "s3",
      startDate: "2024-08-19",
      endDate: "2024-08-23", 
      location: "Complexe sportif de Waterloo",
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

  const handleOptionChange = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions([...selectedOptions, optionId]);
    } else {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
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

            {/* Sessions disponibles - Sélection pour inscription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Sessions disponibles</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Cliquez sur une session pour l'ajouter à votre inscription
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {stageData.sessions.map((session) => (
                  <div 
                    key={session.id}
                    onClick={() => session.spotsLeft > 0 && setSelectedSession(session.id)}
                    className={`border rounded-lg p-4 transition-smooth cursor-pointer ${
                      session.spotsLeft === 0 
                        ? 'border-border bg-muted/50 cursor-not-allowed' 
                        : selectedSession === session.id
                        ? 'border-primary bg-primary/10 shadow-custom-sm'
                        : 'border-border hover:border-primary/50 hover:shadow-custom-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded-full border-2 transition-smooth ${
                            selectedSession === session.id 
                              ? 'border-primary bg-primary' 
                              : 'border-border'
                          }`}>
                            {selectedSession === session.id && (
                              <div className="w-2 h-2 bg-primary-foreground rounded-full m-0.5"></div>
                            )}
                          </div>
                          <div className="font-medium">
                            Du {formatDate(session.startDate)} au {formatDate(session.endDate)}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground ml-6">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{session.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{session.spotsLeft}/{session.capacity} places</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 font-semibold">
                          <Euro className="h-4 w-4" />
                          <span>{session.basePrice}€</span>
                        </div>
                        <Badge 
                          variant={session.spotsLeft > 0 ? "default" : "destructive"}
                          className={session.spotsLeft > 0 ? "bg-success text-success-foreground" : ""}
                        >
                          {session.spotsLeft > 0 ? `${session.spotsLeft} places` : "Complet"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Formulaire d'inscription */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Indication de session sélectionnée */}
                {selectedSession && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-primary">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Session sélectionnée :</span>
                    </div>
                    <div className="mt-1 text-sm">
                      {(() => {
                        const session = stageData.sessions.find(s => s.id === selectedSession);
                        return session ? `Du ${formatDate(session.startDate)} au ${formatDate(session.endDate)}` : '';
                      })()}
                    </div>
                  </div>
                )}

                {!selectedSession && (
                  <div className="bg-muted/50 border border-dashed rounded-lg p-4 text-center text-muted-foreground">
                    <Calendar className="h-5 w-5 mx-auto mb-2" />
                    <p className="text-sm">Veuillez sélectionner une session ci-dessus pour continuer</p>
                  </div>
                )}

                {/* Options tarifaires */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Options supplémentaires</Label>
                  {stageData.options.map((option) => (
                    <div key={option.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={option.id}
                        checked={selectedOptions.includes(option.id)}
                        onCheckedChange={(checked) => handleOptionChange(option.id, !!checked)}
                      />
                      <div className="flex-1 space-y-1">
                        <Label htmlFor={option.id} className="font-medium cursor-pointer">
                          {option.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        +{option.impact}€
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Informations enfant */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Informations de l'enfant</Label>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={childData.firstName}
                        onChange={(e) => setChildData({...childData, firstName: e.target.value})}
                        placeholder="Prénom de l'enfant"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={childData.lastName}
                        onChange={(e) => setChildData({...childData, lastName: e.target.value})}
                        placeholder="Nom de l'enfant"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Date de naissance *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={childData.birthDate}
                      onChange={(e) => setChildData({...childData, birthDate: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Téléphone parent *</Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      value={childData.parentPhone}
                      onChange={(e) => setChildData({...childData, parentPhone: e.target.value})}
                      placeholder="+32 xxx xx xx xx"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Remarques / Allergies</Label>
                    <Textarea
                      id="notes"
                      value={childData.notes}
                      onChange={(e) => setChildData({...childData, notes: e.target.value})}
                      placeholder="Allergies, remarques médicales, informations importantes..."
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Récapitulatif prix */}
                <div className="space-y-3 bg-accent/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Prix de base</span>
                    <span>{selectedSession ? stageData.sessions.find(s => s.id === selectedSession)?.basePrice : 0}€</span>
                  </div>
                  {selectedOptions.map(optionId => {
                    const option = stageData.options.find(opt => opt.id === optionId);
                    return option ? (
                      <div key={optionId} className="flex justify-between items-center text-sm">
                        <span>{option.label}</span>
                        <span>+{option.impact}€</span>
                      </div>
                    ) : null;
                  })}
                  <Separator />
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span className="gradient-text">{calculatePrice()}€</span>
                  </div>
                </div>

                {/* Bouton d'ajout au panier */}
                <Button 
                  size="lg"
                  className="w-full gradient-primary hover:opacity-90 transition-smooth"
                  disabled={!selectedSession || !childData.firstName || !childData.lastName || !childData.birthDate || !childData.parentPhone}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter au panier - {calculatePrice()}€
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StageDetail;