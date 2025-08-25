import { useState, useEffect } from "react";
import { Calendar, Users, MapPin, Euro, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Session {
  id: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
  spotsLeft: number;
  basePrice: number;
}

interface Option {
  id: string;
  label: string;
  description: string;
  impact: number;
  required: boolean;
}

interface ChildData {
  firstName: string;
  lastName: string;
  birthDate: string;
  notes: string;
  parentPhone: string;
}

interface AccordionRegistrationProps {
  sessions: Session[];
  options: Option[];
  selectedSession: string;
  setSelectedSession: (sessionId: string) => void;
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  childData: ChildData;
  setChildData: (data: ChildData) => void;
  calculatePrice: () => number;
}

const AccordionRegistration = ({
  sessions,
  options,
  selectedSession,
  setSelectedSession,
  selectedOptions,
  setSelectedOptions,
  childData,
  setChildData,
  calculatePrice
}: AccordionRegistrationProps) => {
  const [openStep, setOpenStep] = useState<string>("sessions");

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const handleOptionChange = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions([...selectedOptions, optionId]);
    } else {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    }
  };

  // Auto-advance to next step
  useEffect(() => {
    if (selectedSession && openStep === "sessions") {
      setOpenStep("options");
    }
  }, [selectedSession, openStep]);

  const handleSessionSelect = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session && session.spotsLeft > 0) {
      setSelectedSession(sessionId);
    }
  };

  const isStepComplete = (step: string) => {
    switch (step) {
      case "sessions":
        return !!selectedSession;
      case "options":
        return true; // Options are always optional
      case "child-info":
        return !!(childData.firstName && childData.lastName && childData.birthDate && childData.parentPhone);
      default:
        return false;
    }
  };

  const getStepIcon = (step: string) => {
    if (isStepComplete(step)) {
      return <Check className="h-4 w-4 text-success" />;
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscription</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Session sélectionnée - Info */}
        {selectedSession && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 text-primary">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Session sélectionnée :</span>
            </div>
            <div className="mt-1 text-sm">
              {(() => {
                const session = sessions.find(s => s.id === selectedSession);
                return session ? `Du ${formatDate(session.startDate)} au ${formatDate(session.endDate)}` : '';
              })()}
            </div>
          </div>
        )}

        <Accordion type="single" value={openStep} onValueChange={setOpenStep} className="space-y-4">
          {/* Sessions disponibles */}
          <AccordionItem value="sessions" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center space-x-3">
                {getStepIcon("sessions")}
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Sessions disponibles</span>
                {selectedSession && (
                  <Badge variant="secondary" className="ml-auto">
                    Session choisie
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-sm text-muted-foreground mb-4">
                Cliquez sur une session pour l'ajouter à votre inscription
              </p>
              
              <div className="space-y-3">
                {sessions.map((session) => (
                  <div 
                    key={session.id}
                    onClick={() => handleSessionSelect(session.id)}
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
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Options supplémentaires */}
          <AccordionItem value="options" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center space-x-3">
                {getStepIcon("options")}
                <Plus className="h-5 w-5" />
                <span className="font-medium">Options supplémentaires</span>
                {selectedOptions.length > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {selectedOptions.length} option{selectedOptions.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                {options.map((option) => (
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
              
              <div className="mt-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setOpenStep("child-info")}
                  className="w-full"
                >
                  Continuer vers les informations de l'enfant
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Informations de l'enfant */}
          <AccordionItem value="child-info" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center space-x-3">
                {getStepIcon("child-info")}
                <Users className="h-5 w-5" />
                <span className="font-medium">Informations de l'enfant</span>
                {isStepComplete("child-info") && (
                  <Badge variant="secondary" className="ml-auto">
                    Complété
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Récapitulatif prix */}
        <div className="mt-6 space-y-3 bg-accent/20 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span>Prix de base</span>
            <span>{selectedSession ? sessions.find(s => s.id === selectedSession)?.basePrice : 0}€</span>
          </div>
          {selectedOptions.map(optionId => {
            const option = options.find(opt => opt.id === optionId);
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
          className="w-full mt-6 gradient-primary hover:opacity-90 transition-smooth"
          disabled={!selectedSession || !childData.firstName || !childData.lastName || !childData.birthDate || !childData.parentPhone}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter au panier - {calculatePrice()}€
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccordionRegistration;