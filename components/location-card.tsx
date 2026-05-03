"use client"

import { ExternalLink, MapPin } from "lucide-react"
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
        <div className="flex gap-3">
          {location.image && (
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
              <img
                src={location.image}
                alt={location.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="truncate text-sm font-semibold">{location.name}</h3>
              {location.category && (
                <span className="flex-shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {location.category}
                </span>
              )}
            </div>
            <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">{location.description}</p>
            <div className="mt-auto flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{location.address}</span>
            </div>
          </div>
        </div>
        {location.link && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="mt-2 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <a href={location.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-3 w-3" />
              Visiter
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
