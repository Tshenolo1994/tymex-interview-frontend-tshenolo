import React from "react";
import { NFT } from "../types/nftTypes";
import { useFilter } from "../context/FilterContext";
import NFTCard from "./NFTCard"; 

interface NFTGridProps {
  nfts: NFT[];
}

const NFTGrid: React.FC<NFTGridProps> = ({ nfts }) => {
  const { applyFilters } = useFilter();
  const filteredNFTs = Array.isArray(nfts) ? applyFilters(nfts) : [];

  if (filteredNFTs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500">No NFTs found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
      {filteredNFTs.map((nft) => (
        <div key={nft.id} className="flex justify-center">
          <NFTCard nft={nft} />
        </div>
      ))}
    </div>
  );
};

export default NFTGrid;
