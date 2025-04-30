import React, { createContext, useState, useContext, useCallback } from "react";
import { NFT } from "../types/nftTypes";

interface FilterState {
  search: string;
  priceRange: [number, number];
  tier: string;
  theme: string;
  time: string;
  order: string;
  name: string;
}

interface FilterContextType {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  applyFilters: (nfts: NFT[]) => NFT[];
  resetFilters: () => void;
}

const initialFilterState: FilterState = {
  search: "",
  priceRange: [0, 200],
  tier: "All",
  theme: "All",
  time: "Newest",
  order: "Ascending",
  name: "A-Z",
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);

  const applyFilters = useCallback((nfts: NFT[]): NFT[] => {
    if (!Array.isArray(nfts)) {
      console.error("applyFilters received non-array data:", nfts);
      return [];
    }

    const filteredNFTs = nfts.filter((nft) => {
      if (!nft) return false;

      const searchTerm = filterState.search.toLowerCase();

      const matchesSearch =
        searchTerm === "" ||
        (nft.name && nft.name.toLowerCase().includes(searchTerm)) ||
        (nft.creator?.name && nft.creator.name.toLowerCase().includes(searchTerm));

      const matchesPrice =
        nft.price >= filterState.priceRange[0] &&
        nft.price <= filterState.priceRange[1];

      const matchesTier =
        filterState.tier === "All" ||
        (nft.tier && nft.tier.toLowerCase() === filterState.tier.toLowerCase());

      const matchesTheme =
        filterState.theme === "All" ||
        (nft.theme && nft.theme.toLowerCase() === filterState.theme.toLowerCase());

      return matchesSearch && matchesPrice && matchesTier && matchesTheme;
    });

    const sortedNFTs = filteredNFTs.sort((a, b) => {
      // Sort by time
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      const timeDiff =
        filterState.time === "Newest" ? timeB - timeA : timeA - timeB;
      if (timeDiff !== 0) return timeDiff;

      // Sort by name
      const nameDiff =
        filterState.name === "Z-A"
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      if (nameDiff !== 0) return nameDiff;

      // Sort by price
      return filterState.order === "Descending"
        ? b.price - a.price
        : a.price - b.price;
    });

    return sortedNFTs;
  }, [filterState]);

  const resetFilters = useCallback(() => {
    setFilterState(initialFilterState);
  }, []);

  return (
    <FilterContext.Provider
      value={{
        filterState,
        setFilterState,
        applyFilters,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
