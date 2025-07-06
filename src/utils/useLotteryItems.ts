import { useRequest } from 'ahooks';
import { useState } from 'react';
import { getLotteryItems } from '../pages/Point/api';

const LOTTERY_CACHE_KEY = "lotteryItems";

function useLotteryItems() {
  const [cachedData, setCachedData] = useState<any>(() => {
    const stored = sessionStorage.getItem(LOTTERY_CACHE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const { data, error, loading, run, refresh } = useRequest(
    async () => {
      const result = await getLotteryItems();
      sessionStorage.setItem(LOTTERY_CACHE_KEY, JSON.stringify(result));
      setCachedData(result);
      return result;
    },
    {
      manual: !!cachedData, // only call API if no cached data
    }
  );

  return {
    data: cachedData || data,
    error,
    loading: !cachedData && loading,
    refresh: () => {
      sessionStorage.removeItem(LOTTERY_CACHE_KEY);
      run(); // re-fetch and cache again
    },
  };
}

export default useLotteryItems;
