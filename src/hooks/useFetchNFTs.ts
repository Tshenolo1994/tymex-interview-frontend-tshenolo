import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { NFT } from '../types/nftTypes';

interface UseFetchNFTsResult {
  nfts: NFT[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export const useFetchNFTs = (autoRefresh: boolean = true): UseFetchNFTsResult => {
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<number | null>(null);

  const fetchNFTs = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setLoading(true);
      const response = await axios.get<NFT[]>('http://localhost:4000/nfts', {
        signal: controller.signal,
      });

      if (Array.isArray(response.data)) {
        setNFTs(response.data);
        setLastUpdated(new Date());
        setError(null);
      } else {
        console.error('API did not return an array:', response.data);
        setNFTs([]);
        setError('API returned invalid data format');
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request cancelled');
      } else {
        console.error('Error fetching NFTs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch NFTs');
      }
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchNFTs();

    if (autoRefresh) {
      intervalRef.current = window.setInterval(() => {
        if (document.visibilityState === 'visible') {
          fetchNFTs();
        }
      }, 60000);

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          fetchNFTs();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      };
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchNFTs, autoRefresh]);

  return {
    nfts,
    loading,
    error,
    lastUpdated,
    refresh: fetchNFTs,
  };
};
