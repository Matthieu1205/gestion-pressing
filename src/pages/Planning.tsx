import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Zap, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addMonths, subMonths, startOfWeek, addDays } from "date-fns";
import { fr } from "date-fns/locale";

const generateWeekData = (startDate: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(startDate, i);
    const dayOfWeek = date.getDay();
    const isSunday = dayOfWeek === 0;
    
    days.push({
      date: format(date, "d"),
      day: format(date, "EEE", { locale: fr }),
      capacity: isSunday ? 0 : 100,
      load: isSunday ? 0 : Math.floor(Math.random() * 50) + 70,
      express: isSunday ? 0 : Math.floor(Math.random() * 15) + 2,
      closed: isSunday,
      overload: !isSunday && Math.random() > 0.7,
    });
  }
  return days;
};

export default function Planning() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = generateWeekData(weekStart);

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planning</h1>
          <p className="text-muted-foreground">
            Gérez la capacité et la charge de l'atelier
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium px-4 capitalize">
            {format(currentDate, "MMMM yyyy", { locale: fr })}
          </span>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Capacity Settings */}
      <Card className="p-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="font-bold text-primary">100</span>
            </div>
            <div>
              <p className="font-medium">Capacité journalière</p>
              <p className="text-sm text-muted-foreground">Articles par jour</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-medium">Quota Express</p>
              <p className="text-sm text-muted-foreground">20% max de la capacité</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Week View */}
      <div className="grid grid-cols-7 gap-3">
        {weekDays.map((day, index) => (
          <Card
            key={day.date}
            className={cn(
              "p-4 transition-all animate-slide-up",
              day.closed && "opacity-50",
              day.overload && "border-destructive/50 bg-destructive/5"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">{day.day}</p>
              <p className="text-2xl font-bold">{day.date}</p>
            </div>

            {day.closed ? (
              <div className="text-center py-8">
                <Badge variant="secondary">Fermé</Badge>
              </div>
            ) : (
              <>
                {/* Progress bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Charge</span>
                    <span className={cn(
                      "font-medium",
                      day.overload && "text-destructive"
                    )}>
                      {day.load}/{day.capacity}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        day.overload ? "bg-destructive" : "bg-primary"
                      )}
                      style={{ width: `${Math.min((day.load / day.capacity) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Express badge */}
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-accent">
                    <Zap className="h-3 w-3" />
                    Express
                  </span>
                  <span>{day.express}</span>
                </div>

                {/* Overload warning */}
                {day.overload && (
                  <div className="mt-3 flex items-center gap-1 text-xs text-destructive">
                    <AlertTriangle className="h-3 w-3" />
                    Capacité dépassée
                  </div>
                )}
              </>
            )}
          </Card>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Charge normale</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-destructive" />
          <span className="text-muted-foreground">Surcharge</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-3 w-3 text-accent" />
          <span className="text-muted-foreground">Articles Express</span>
        </div>
      </div>
    </div>
  );
}
