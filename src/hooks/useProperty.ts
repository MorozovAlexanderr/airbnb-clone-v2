import { useState, useEffect } from "react";
import { Property } from "@/types";
import { PropertyService } from "@/lib/services/propertyService";

interface UsePropertyReturn {
  property: Property | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProperty(id: string): UsePropertyReturn {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PropertyService.getProperty(id);
      setProperty(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch property");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  return {
    property,
    loading,
    error,
    refetch: fetchProperty,
  };
}
