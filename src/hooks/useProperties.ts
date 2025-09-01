import { useState, useEffect } from "react";
import { Property, SearchFilters } from "@/types";
import { PropertyService } from "@/lib/services/propertyService";

interface UsePropertiesReturn {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProperties(
  filters?: SearchFilters,
  page = 1,
  limit = 20
): UsePropertiesReturn {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PropertyService.getProperties(filters, page, limit);
      setProperties(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch properties"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters, page, limit]);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
  };
}
