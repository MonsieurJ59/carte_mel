"use client"

import { ExternalLink, MapPin, Phone } from "lucide-react"
import type { Location } from "@/types/location"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LocationCardProps {
  location: Location
  isSelected: boolean
  onClick: () => void
}

export function LocationCard({ location, isSelected, onClick }: LocationCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold text-foreground leading-snug">{location.name}</h3>
            <div className="flex flex-col items-end gap-1">
              {location.territory && (
                <span className="flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border border-primary/30 text-primary bg-primary/5">
                  {location.territory === "MEL" ? "MEL" : "HORS MEL"}
                </span>
              )}
              {location.category && (
                <span className={cn(
                  "flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white",
                  location.category === "TSA" ? "bg-red-500" : 
                  location.category === "Polyhandicap" ? "bg-blue-500" : 
                  "bg-purple-600"
                )}>
                  {location.category}
                </span>
              )}
            </div>
          </div>

          <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {location.description}
          </p>

          <div className="space-y-1.5 mt-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
              <span className="truncate">{location.address}</span>
            </div>
            
            {location.phone && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Phone className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                <span>{location.phone}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
