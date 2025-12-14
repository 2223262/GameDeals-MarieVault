import { useStores } from "@/contexts/StoreContext";
import { cn } from "@/lib/utils";
import { Deal } from "@/types/cheapshark";
import { Heart } from "lucide-react";

interface DealCardProps {
  deal: Deal;
  isFavorite: boolean;
  onToggleFavorite: (deal: Deal) => void;
}

export function DealCard({ deal, isFavorite, onToggleFavorite }: DealCardProps) {
  const { getStoreName, getStoreIcon } = useStores();
  const savings = parseFloat(deal.savings);
  const score = parseInt(deal.dealRating);

  return (
    <div className="group relative bg-white border-4 border-black p-0 transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(255,230,0,1)] h-full flex flex-col">
      {/* Image Container with "Tape" effect */}
      <div className="relative h-32 overflow-hidden border-b-4 border-black bg-gray-200">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-400/80 rotate-1 z-10 shadow-sm"></div>
        <img 
          src={deal.thumb} 
          alt={deal.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110 grayscale group-hover:grayscale-0 duration-300"
          loading="lazy"
        />
        
        {/* Savings Badge */}
        {savings > 0 && (
          <div className="absolute bottom-0 right-0 bg-red-600 text-white px-2 py-1 font-display text-xl border-t-2 border-l-2 border-black">
            -{Math.round(savings)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow relative">
        {/* Store Icon */}
        <div className="absolute -top-8 left-2 w-10 h-10 bg-white border-2 border-black rounded-full p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">
          <img 
            src={getStoreIcon(deal.storeID)} 
            alt={getStoreName(deal.storeID)}
            className="w-full h-full object-contain"
            title={getStoreName(deal.storeID)}
          />
        </div>

        <h3 className="font-display text-2xl leading-none mb-2 mt-2 line-clamp-2 h-12" title={deal.title}>
          {deal.title}
        </h3>

        <div className="flex justify-between items-end mt-auto">
          <div className="flex flex-col">
            {savings > 0 && (
              <span className="text-gray-500 line-through font-sans text-sm decoration-2 decoration-red-500">
                ${deal.normalPrice}
              </span>
            )}
            <span className="font-display text-3xl text-black bg-yellow-300 px-1 -ml-1">
              ${deal.salePrice}
            </span>
          </div>

          <div className="flex gap-2">
            {/* Metacritic Score if available */}
            {parseInt(deal.metacriticScore) > 0 && (
              <div className={cn(
                "flex items-center justify-center w-8 h-8 border-2 border-black font-bold text-xs",
                parseInt(deal.metacriticScore) >= 75 ? "bg-green-400" : 
                parseInt(deal.metacriticScore) >= 50 ? "bg-yellow-400" : "bg-red-400"
              )} title="Metacritic Score">
                {deal.metacriticScore}
              </div>
            )}
            
            {/* Favorite Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(deal);
              }}
              className={cn(
                "w-8 h-8 flex items-center justify-center border-2 border-black transition-colors hover:bg-pink-200",
                isFavorite ? "bg-pink-500 text-white" : "bg-white text-black"
              )}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
            </button>
          </div>
        </div>
        
        {/* Deal Rating Bar */}
        <div className="mt-3 w-full h-2 bg-gray-200 border border-black relative">
          <div 
            className="h-full bg-black transition-all duration-500" 
            style={{ width: `${score * 10}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
