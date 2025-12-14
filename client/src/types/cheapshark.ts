export interface Deal {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string; // "0" or "1"
  savings: string; // percentage
  metacriticScore: string;
  steamRatingText: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID: string;
  releaseDate: number; // unix timestamp
  lastChange: number; // unix timestamp
  dealRating: string; // 0-10
  thumb: string;
}

export interface Store {
  storeID: string;
  storeName: string;
  isActive: number;
  images: {
    banner: string;
    logo: string;
    icon: string;
  };
}

export interface GameLookup {
  info: {
    title: string;
    steamAppID: string;
    thumb: string;
  };
  cheapestPriceEver: {
    price: string;
    date: number;
  };
  deals: Array<{
    storeID: string;
    dealID: string;
    price: string;
    retailPrice: string;
    savings: string;
  }>;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface DealParams {
  storeID?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: 'DealRating' | 'Title' | 'Savings' | 'Price' | 'Metacritic' | 'Reviews' | 'Release' | 'Store' | 'Recent';
  desc?: number; // 0 or 1
  lowerPrice?: number;
  upperPrice?: number;
  title?: string;
  AAA?: number; // 0 or 1
}
