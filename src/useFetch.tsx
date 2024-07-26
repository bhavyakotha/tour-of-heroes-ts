import { useEffect, useState } from "react";

interface UseFetchResult<T> {
  data: T | null;
  isPending: boolean;
  error: string | null;
}

const useFetch = <T,>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortCont = new AbortController();
    setIsPending(true); // Set pending to true whenever URL changes
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data: T) => {
        setData(data);
        setIsPending(false);
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
