import { render, screen, act, renderHook } from '@testing-library/react';
import { useFetchNFTs } from '../hooks/useFetchNFTs';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockNFTs = [
  {
    id: 1,
    name: 'Test NFT',
    image: 'test.jpg',
    tier: 'rare',
    price: 1.5,
    creator: {
      creatorName: 'Artist',
      creatorProfilePic: 'artist.jpg',
      status: 'online',
    },
    isFavourite: false,
  },
];

describe('useFetchNFTs hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });


  test('returns loading state and then data when successful', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockNFTs });
    
    const { result } = renderHook(() => useFetchNFTs(false));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.nfts).toEqual([]);
    
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.nfts).toEqual(mockNFTs);
  });


  test('handles fetch error', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));
    
    const { result } = renderHook(() => useFetchNFTs(false));
    
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    
    expect(result.current.error).toBe('Network error');
  });


  test('auto-refreshes when document becomes visible', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockNFTs });
    
    const { result } = renderHook(() => useFetchNFTs(true));
    
    await act(async () => {
   
      await jest.runAllTimersAsync();
      
   
      Object.defineProperty(document, 'visibilityState', { value: 'visible' });
      document.dispatchEvent(new Event('visibilitychange'));
      

      jest.advanceTimersByTime(60000);
      await jest.runOnlyPendingTimersAsync();
    });
    
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });


  test('manual refresh triggers new fetch', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockNFTs });
    
    const TestComponent = () => {
      const { refresh } = useFetchNFTs(false);
      return <button onClick={refresh}>Refresh</button>;
    };
    
    render(<TestComponent />);
    
    await act(async () => {
      await userEvent.click(screen.getByText('Refresh'));
    });
    
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });
});
