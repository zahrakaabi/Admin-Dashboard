/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

// UI Lib Compoennts
import { 
    Button,
    Card,
    CardContent,
    Carousel, 
    CarouselContent, 
    CarouselItem,
    type CarouselApi
} from "@/components/ui";
import { cn } from "@/lib/utils";

// UI Local Components
import Image from "@/components/image";

// Utils
import { NEW_PRODUCTS } from "@/_mock";

/* -------------------------------------------------------------------------- */
/*                        ECOMMERCE FEATURED COMPONENT                        */
/* -------------------------------------------------------------------------- */
function EcommerceFeatured() {
/* --------------------------------- CONSTS --------------------------------- */
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Card className="flex-shrink-0 flex-grow-0 flex-auto w-full max-w-[16.5rem] overflow-hidden border-none p-0 shadow-sm">
        <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="w-full p-0"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
        <CarouselContent className="-ml-0">
            {NEW_PRODUCTS.map((product) => {
                const { id, name, image } = product;
                return (
                    <CarouselItem key={id} className="pl-0">
                        <ProductCard name={name} image={image} />
                    </CarouselItem>
                )})
            }
        </CarouselContent>

        {/* Carousel dots */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5">
            {Array.from({ length: count }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    current === index
                        ? "w-5 bg-blue-600" // Active dot
                        : "w-2 bg-white/40 hover:bg-white/70"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
        </Carousel>
    </Card>
  )
};

/* -------------------------------------------------------------------------- */
/*                           PRODUCT ITEM COMPONENT                           */
/* -------------------------------------------------------------------------- */
type ProductCardProps = {
    name: string,
    image: string
};

function ProductCard({ name, image }: ProductCardProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Card className="relative w-full py-0 overflow-hidden rounded-2xl border-0 shadow-none">
        <CardContent className="relative min-h-[15rem] w-full p-0">
            {/* Background Image */}
            <div className="w-full h-full absolute inset-0 z-0">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <Image src={image} alt={name} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            {/* Floating Content Box */}
            <div className="absolute bottom-0 left-0 z-10 flex flex-col items-start p-6 text-white max-w-[80%]">
                <span className="mb-1 text-xs font-bold uppercase tracking-wider text-white/70">
                    New
                </span>
                <h3 className="mb-4 text-2xl font-bold tracking-tight text-white line-clamp-1">
                    {name}
                </h3>
                <Button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 border-none">
                    Buy now
                </Button>
            </div>
        </CardContent>
    </Card>
  )
};

export default EcommerceFeatured;