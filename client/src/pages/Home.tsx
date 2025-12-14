import { DealCard } from "@/components/DealCard";
import { MarieFeedback } from "@/components/MarieFeedback";
import { Pagination } from "@/components/Pagination";
import { StoreProvider, useStores } from "@/contexts/StoreContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { api } from "@/lib/api";
import { Deal, DealParams } from "@/types/cheapshark";
import { cn } from "@/lib/utils";
import { Filter, Heart, Search, SortAsc, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

// Filter Component wrapped in StoreProvider context
function GameDeals() {
  const { stores, isLoading: storesLoading } = useStores();
  
  // State
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  
  // Persisted State
  const [favorites, setFavorites] = useLocalStorage<Deal[]>('marievault_favorites', []);
  const [filters, setFilters] = useLocalStorage<DealParams>('marievault_filters', {
    pageNumber: 0,
    pageSize: 12,
    sortBy: 'DealRating',
    desc: 0,
    lowerPrice: 0,
    upperPrice: 50,
    storeID: '',
    title: ''
  });

  // Search Debounce
  const debouncedTitle = useDebounce(filters.title, 400);
  
  // Refs for abort controller
  const abortControllerRef = useRef<AbortController | null>(null);

  // Derived state
  const showFavorites = filters.storeID === 'favorites';

  // Fetch Deals
  useEffect(() => {
    if (showFavorites) return;

    const fetchDeals = async () => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      setLoading(true);
      setError(null);
      
      try {
        const params = { ...filters, title: debouncedTitle };
        
        // Parallel fetch for deals and total pages (only on first page or filter change)
        const [dealsData, totalPagesCount] = await Promise.all([
          api.getDeals(params, abortControllerRef.current.signal),
          api.getTotalPages(params, abortControllerRef.current.signal)
        ]);
        
        setDeals(dealsData);
        setTotalPages(totalPagesCount);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch deals. The TV world is static...');
          setDeals([]);
        }
      } finally {
        if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDeals();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    filters.pageNumber, 
    filters.pageSize, 
    filters.sortBy, 
    filters.desc, 
    filters.storeID, 
    filters.lowerPrice, 
    filters.upperPrice, 
    debouncedTitle
  ]);

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, title: e.target.value, pageNumber: 0 }));
  };

  const handleFilterChange = (key: keyof DealParams, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, pageNumber: 0 }));
  };

  const toggleFavorite = (deal: Deal) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.dealID === deal.dealID);
      if (exists) {
        return prev.filter(f => f.dealID !== deal.dealID);
      }
      return [...prev, deal];
    });
  };

  const isFavorite = (dealID: string) => {
    return favorites.some(f => f.dealID === dealID);
  };

  const displayedDeals = showFavorites ? favorites : deals;

  return (
    <div className="min-h-screen bg-[#F0F0F0] pb-20 relative overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-[20px] border-black"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 border-[40px] border-yellow-400 rotate-12"></div>
      </div>

      {/* Header */}
      <header className="bg-yellow-400 border-b-8 border-black sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white p-2 font-display text-4xl tracking-widest transform -rotate-2">
              MARIE
            </div>
            <div className="bg-white text-black border-4 border-black p-1 font-display text-4xl tracking-widest transform rotate-1">
              VAULT
            </div>
          </div>
          
          <div className="relative w-full md:w-1/2 mt-12 md:mt-0">
            {/* Marie Sitting on Search Bar */}
            <img 
              src="/images/marie-sitting.webp" 
              alt="Marie sitting" 
              className="absolute -top-[110px] -right-4 w-32 z-20 pointer-events-none drop-shadow-lg filter"
            />
            <input
              type="text"
              placeholder="SEARCH FOR TRUTH (AND GAMES)..."
              value={filters.title || ''}
              onChange={handleSearch}
              className="w-full bg-white border-4 border-black p-3 pl-12 font-sans text-xl uppercase placeholder:text-gray-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black" />
            {filters.title && (
              <button 
                onClick={() => handleFilterChange('title', '')}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-gray-200 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Link href="/presentation">
              <button className="flex items-center gap-2 px-4 py-2 border-4 border-black bg-black text-white font-display text-xl transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,230,0,1)]">
                REPORT
              </button>
            </Link>
            <button 
              onClick={() => handleFilterChange('storeID', showFavorites ? '' : 'favorites')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 border-4 border-black font-display text-xl transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                showFavorites ? "bg-pink-500 text-white" : "bg-white text-black"
              )}
            >
              <Heart className={cn("w-6 h-6", showFavorites && "fill-current")} />
              FAVORITES ({favorites.length})
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Filters Bar */}
        <div className="bg-white border-4 border-black p-4 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-wrap gap-4 items-end">
            
            {/* Store Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="font-display text-xl mb-1 block">STORE</label>
              <div className="relative">
                <select 
                  value={filters.storeID === 'favorites' ? '' : filters.storeID}
                  onChange={(e) => handleFilterChange('storeID', e.target.value)}
                  disabled={showFavorites || storesLoading}
                  className="w-full appearance-none bg-gray-100 border-2 border-black p-2 font-sans text-lg focus:bg-yellow-100 focus:outline-none"
                >
                  <option value="">ALL STORES</option>
                  {stores.map(store => (
                    <option key={store.storeID} value={store.storeID}>
                      {store.storeName}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Sort Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="font-display text-xl mb-1 block">SORT BY</label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <select 
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    disabled={showFavorites}
                    className="w-full appearance-none bg-gray-100 border-2 border-black p-2 font-sans text-lg focus:bg-yellow-100 focus:outline-none"
                  >
                    <option value="DealRating">DEAL RATING</option>
                    <option value="Price">PRICE</option>
                    <option value="Savings">SAVINGS</option>
                    <option value="Title">TITLE</option>
                    <option value="Metacritic">METACRITIC</option>
                    <option value="Release">RELEASE DATE</option>
                  </select>
                  <SortAsc className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
                </div>
                <button 
                  onClick={() => handleFilterChange('desc', filters.desc === 1 ? 0 : 1)}
                  disabled={showFavorites}
                  className="bg-black text-white px-3 font-bold border-2 border-black hover:bg-yellow-400 hover:text-black transition-colors"
                  title={filters.desc ? "Descending" : "Ascending"}
                >
                  {filters.desc ? "DESC" : "ASC"}
                </button>
              </div>
            </div>

            {/* Price Range */}
            <div className="flex-1 min-w-[200px]">
              <label className="font-display text-xl mb-1 block">PRICE LIMIT: ${filters.upperPrice}</label>
              <input 
                type="range" 
                min="0" 
                max="50" 
                step="1"
                value={filters.upperPrice}
                onChange={(e) => handleFilterChange('upperPrice', parseInt(e.target.value))}
                disabled={showFavorites}
                className="w-full h-4 bg-gray-200 rounded-none appearance-none cursor-pointer border-2 border-black [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <MarieFeedback message="TUNING INTO THE TV WORLD... PLEASE WAIT!" type="loading" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <MarieFeedback message={error} type="error" />
            <button 
              onClick={() => handleFilterChange('pageNumber', 0)} // Trigger re-fetch
              className="bg-black text-white px-6 py-3 font-display text-2xl hover:bg-yellow-400 hover:text-black border-4 border-black transition-all"
            >
              TRY AGAIN
            </button>
          </div>
        ) : displayedDeals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <MarieFeedback 
              message={showFavorites ? "NO FAVORITES YET. GO FIND SOME TREASURES!" : "NO DEALS FOUND. THE FOG IS TOO THICK..."} 
              type="info" 
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedDeals.map((deal) => (
                <DealCard 
                  key={deal.dealID} 
                  deal={deal} 
                  isFavorite={isFavorite(deal.dealID)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            {!showFavorites && (
              <Pagination 
                currentPage={filters.pageNumber || 0}
                totalPages={totalPages}
                onPageChange={(page) => handleFilterChange('pageNumber', page)}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <GameDeals />
    </StoreProvider>
  );
}
