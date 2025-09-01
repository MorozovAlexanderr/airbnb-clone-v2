import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function calculateDays(checkIn: Date, checkOut: Date): number {
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export function calculateTotalPrice(
  pricePerNight: number,
  checkIn: Date,
  checkOut: Date
): number {
  const days = calculateDays(checkIn, checkOut);
  return pricePerNight * days;
}

export function getPropertyTypeIcon(propertyType: string): string {
  const icons: Record<string, string> = {
    beach: "🏖️",
    mountain: "🏔️",
    city: "🏙️",
    countryside: "🌾",
    lake: "🏞️",
    forest: "🌲",
    desert: "🏜️",
    tropical: "🌴",
    urban: "🏢",
    rural: "🏡",
  };

  return icons[propertyType.toLowerCase()] || "🏠";
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
