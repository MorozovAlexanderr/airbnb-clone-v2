export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  pricePerNight: number;
  location: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  hostId: string;
  createdAt: Date;
  updatedAt: Date;
  host: User;
  images: Image[];
  reviews: Review[];
}

export interface Image {
  id: string;
  propertyId: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  createdAt: Date;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: Date;
  checkOut: Date;
  guestCount: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: Date;
  property: Property;
  user: User;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  rating: number;
  comment: string;
  photos: string[];
  createdAt: Date;
  user: User;
}

export interface SearchFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  priceMin?: number;
  priceMax?: number;
  propertyType?: string;
  amenities?: string[];
}

export interface BookingFormData {
  checkIn: Date;
  checkOut: Date;
  guests: number;
}
