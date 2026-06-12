# Content Knowledge Graph

```mermaid
flowchart TD
  Org[HomeBuyerBoise_Org]
  Web[WebSite]
  Services[17_ServiceEntities]
  Locations[8_LocationEntities]
  Projects[6_ProjectEntities]
  Blog[56_BlogPosts]
  Tools[GetQuote_SavingsCalc]

  Org --> Web
  Web --> Services
  Web --> Locations
  Web --> Blog
  Web --> Projects
  Web --> Tools
  Services --> Locations
  Services --> Projects
  Locations --> Projects
  Blog --> Services
  Blog --> Locations
```

## Entity Relationships

| From | To | Relationship |
|------|-----|--------------|
| Organization | 17 Services | offers / hasOfferCatalog |
| Organization | 8 Locations | areaServed |
| Service | Location | service×city pages (136) |
| Project | Service | case study proof |
| Project | Location | geographic authority |
| Blog | Service/Location | topical support + internal links |

## Source of Truth

- `shared/entityGraph.ts` — programmatic entity registry
- `lib/schema.ts` — JSON-LD `@id` graph
- `shared/serviceCityMatrix/` — service×location content clusters
