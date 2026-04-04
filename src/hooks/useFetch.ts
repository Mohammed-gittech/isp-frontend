import { useState, useEffect } from "react";
import type { ApiResponse } from "@/types/api.types";

function useFetch<T>(apiCall: () => Promise<ApiResponse<T>>) {
  // Store the fetched data
  const [data, setData] = useState<T | null>(null);

  // Track loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Store error message
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Start loading
        setIsLoading(true);

        // Clear previous errors
        setError("");

        // Call the API function
        const response = await apiCall();

        // Check if data exists
        if (!response.data) {
          setError("لم يتم العثور على بيانات");
          return;
        }

        // Save data
        setData(response.data);
      } catch (err: unknown) {
        // Handle error
        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: { data?: { message?: string } };
          };
          setError(
            axiosError.response?.data?.message ?? "حدث خطأ، حاول مرة أخرى",
          );
        } else {
          setError("حدث خطأ، حاول مرة أخرى");
        }
      } finally {
        // Always stop loading
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiCall]);

  return { data, isLoading, error };
}

export default useFetch;
