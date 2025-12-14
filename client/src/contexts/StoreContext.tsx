import { api } from "@/lib/api";
import { Store } from "@/types/cheapshark";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface StoreContextType {
  stores: Store[];
  getStoreName: (id: string) => string;
  getStoreIcon: (id: string) => string;
  isLoading: boolean;
  error: string | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    async function loadStores() {
      try {
        setIsLoading(true);
        // Check localStorage first
        const cachedStores = localStorage.getItem('marievault_stores');
        const cachedTime = localStorage.getItem('marievault_stores_time');
        
        // Cache valid for 24 hours
        if (cachedStores && cachedTime && (Date.now() - parseInt(cachedTime)) < 86400000) {
          setStores(JSON.parse(cachedStores));
          setIsLoading(false);
          return;
        }
        
        const data = await api.getStores(controller.signal);
        const activeStores = data.filter(s => s.isActive === 1);
        
        setStores(activeStores);
        localStorage.setItem('marievault_stores', JSON.stringify(activeStores));
        localStorage.setItem('marievault_stores_time', Date.now().toString());
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError('Failed to load store data');
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    loadStores();
    
    return () => controller.abort();
  }, []);

  const getStoreName = (id: string) => {
    const store = stores.find(s => s.storeID === id);
    return store ? store.storeName : 'Unknown Store';
  };

  const getStoreIcon = (id: string) => {
    const store = stores.find(s => s.storeID === id);
    return store ? `https://www.cheapshark.com${store.images.icon}` : '';
  };

  return (
    <StoreContext.Provider value={{ stores, getStoreName, getStoreIcon, isLoading, error }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStores() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStores must be used within a StoreProvider");
  }
  return context;
}
