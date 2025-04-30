import { useState } from 'react';
import Header from '../components/Header';
import SearchFilter from '../components/SearchFilter';
import NFTGrid from '../components/NFTGRid';
import { useFetchNFTs } from '../hooks/useFetchNFTs';
import { FilterProvider } from '../context/FilterContext';
import marketplaceBg from '../assets/layout images/marketplace-bg.png';
import { useTheme } from '../context/ThemeContext';

const ITEMS_PER_PAGE = 8;

const MarketPlace = () => {
  const { nfts, loading, error } = useFetchNFTs();
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { theme } = useTheme();

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNFTs = nfts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(nfts.length / ITEMS_PER_PAGE);

  const changePage = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <FilterProvider>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${marketplaceBg})` }}
      >
        <Header />

        {loading && <div className="text-center py-8">Loading...</div>}
        {error && <div className="text-red-500 text-center py-8">{error}</div>}

        {!loading && !error && (
          <div className="flex flex-col md:flex-row gap-8 px-2 py-4 container mx-auto">
            <div className="hidden md:block flex-shrink-0">
              <SearchFilter />
            </div>

            <div className="flex-1">
              <div className="md:hidden mb-4 flex justify-end">
                <button
                  style={{ background: theme.gradient }}
                  className="bg-black text-white px-4 py-2 rounded"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  Filters
                </button>
              </div>

              <NFTGrid nfts={paginatedNFTs} />

              <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => changePage(index + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === index + 1 ? 'text-white' : 'bg-gray-200'
                    }`}
                    style={{
                      background: currentPage === index + 1 ? theme.gradient : undefined,
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setIsDrawerOpen(false)}
            />

            <div className="relative bg-white w-full h-full shadow-lg p-4 z-50 md:w-64">
              <button
                className="mb-4 text-sm text-gray-700"
                style={{ background: theme.gradient }}
                onClick={() => setIsDrawerOpen(false)}
              >
                Close
              </button>
              <SearchFilter />
            </div>
          </div>
        )}
      </div>
    </FilterProvider>
  );
};

export default MarketPlace;
