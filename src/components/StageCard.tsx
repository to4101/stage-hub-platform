import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Euro } from "lucide-react";

interface StageCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  ageRange: string;
  location: string;
  nextSession: string;
  spotsLeft: number;
  price: number;
  available: boolean;
}

const StageCard = ({ 
  id,
  title, 
  description, 
  image, 
  type, 
  ageRange, 
  location, 
  nextSession, 
  spotsLeft, 
  price, 
  available 
}: StageCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-custom-lg transition-all duration-300 border-0 shadow-custom-sm">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {type}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge 
            variant={available ? "default" : "destructive"}
            className={available ? "bg-success text-success-foreground" : ""}
          >
            {available ? `${spotsLeft} places` : "Complet"}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="space-y-2">
        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-smooth">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{ageRange}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{nextSession}</span>
          </div>
          <div className="flex items-center space-x-1 font-semibold text-lg">
            <Euro className="h-4 w-4" />
            <span>À partir de {price}€</span>
          </div>
        </div>

        <Button 
          asChild
          className="w-full gradient-primary hover:opacity-90 transition-smooth" 
        >
          <Link to={`/stage/${id}`}>
            Voir les détails
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default StageCard;