"use client"

import { ExternalLink, MapPin } from "lucide-react"
import type { Location } from "@/types/location"
import { Button } from "@/components/ui/button"

interface MarkerPopupProps {
  location: Location
}

export function MarkerPopup({ location }: MarkerPopupProps) {
  return (
    <div className="min-w-[250px] max-w-[300px]">
      {location.image && (
        <div className="relative -mx-3 -mt-3 mb-3 h-32 overflow-hidden rounded-t-lg">
          <img
            src={location.image}
            alt={location.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none"
            }}
          />
          {location.category && (
            <span className="absolute right-2 top-2 rounded-full bg-primary/90 px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {location.category}
            </span>
          )}
        </div>
      )}

      <h3 className="mb-1 text-base font-semibold text-foreground">{location.name}</h3>

      <p className="mb-2 text-sm text-muted-foreground leading-relaxed">{location.description}</p>

      <div className="mb-3 flex items-start gap-1.5 text-xs text-muted-foreground">
        <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0" />
        <span>{location.address}</span>
      </div>

      {location.link && (
        <Button asChild size="sm" className="w-full">
          <a href={location.link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
            Visiter le site
          </a>
        </Button>
      )}
    </div>
  )
}
