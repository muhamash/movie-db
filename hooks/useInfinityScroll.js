import { useEffect, useState } from "react";

export function useInfiniteScroll(initialData, type, dynamicFetchUrl) {
  const [data, setData] = useState(initialData || []); // Ensure initialData is always an array
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2); // Start with page 2 as page 1 is the initial data
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    const fetchMoreData = async () => {
      if (loading || noMoreData) return; // Prevent multiple requests while already loading or no more data
      setLoading(true);

      const url = dynamicFetchUrl(type, page); // Construct dynamic URL

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch more data.");
        const result = await response.json();

        if (Array.isArray(result.data) && result.data.length > 0) {
          // Append new data to the existing state
          setData((prevData) => [...prevData, ...result.data]);
        } else {
          setNoMoreData(true); // Mark no more data available
        }
      } catch (error) {
        console.error("Error fetching more data:", error);
        setNoMoreData(true); // Set noMoreData to true in case of an error
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    // Trigger data fetch when `page` changes (not on the first render)
    if (page > 1) {
      fetchMoreData();
    }
  }, [page, type, dynamicFetchUrl, noMoreData, loading]); // Watch `page`, `type`, and `noMoreData`

  return { data, loading, noMoreData, setPage };
}