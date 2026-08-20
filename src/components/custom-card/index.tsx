/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import type React from "react";

// UI Lib Components
import { 
  Card,  
  CardHeader, 
  CardDescription,
  CardTitle,
  CardContent,
  Separator,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui";

/* -------------------------------------------------------------------------- */
/*                                 CUSTOM CARD                                */
/* -------------------------------------------------------------------------- */
type CustomCardProps = {
  cardTitle: string,
  cardDescription: string,
  content: React.ReactNode
};

function CustomCard({ cardTitle, cardDescription, content }: CustomCardProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Collapsible defaultOpen={true} className="w-full">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="mb-2">{cardTitle}</CardTitle>
            <CardDescription>{cardDescription}</CardDescription>
          </div>
          <CollapsibleTrigger asChild>
            <button className="group flex items-center justify-center w-8 h-8 rounded-full border-none bg-transparent hover:bg-gray-100 cursor-pointer transition-transform" type="button">
              <svg 
              className="lucide lucide-chevron-down transition-transform duration-300 group-data-[state=open]:rotate-180"
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <Separator className="mb-6" />
          <CardContent className="grid gap-6">
            {content}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>          
  )
};

export default CustomCard;