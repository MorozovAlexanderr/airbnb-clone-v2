import { Property, SearchFilters } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class PropertyService {
  static async getProperties(
    filters?: SearchFilters,
    page = 1,
    limit = 20
  ): Promise<Property[]> {
    const params = new URLSearchParams();

    if (filters?.location) params.append("location", filters.location);
    if (filters?.propertyType)
      params.append("propertyType", filters.propertyType);
    if (filters?.priceMin)
      params.append("minPrice", filters.priceMin.toString());
    if (filters?.priceMax)
      params.append("maxPrice", filters.priceMax.toString());
    if (filters?.guests) params.append("guests", filters.guests.toString());

    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const response = await fetch(
      `${API_BASE_URL}/api/properties?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }

    return response.json();
  }

  static async getProperty(id: string): Promise<Property> {
    const response = await fetch(`${API_BASE_URL}/api/properties/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch property");
    }

    return response.json();
  }

  static async seedDatabase(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/seed`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to seed database");
    }
  }
}
