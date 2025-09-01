"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star, MapPin, Users, Bed, Bath } from "lucide-react";
import { Property } from "@/types";
import { formatPrice, getPropertyTypeIcon } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  index: number;
}

export default function PropertyCard({ property, index }: PropertyCardProps) {
  const primaryImage =
    property.images.find((img) => img.isPrimary) || property.images[0];
  const averageRating =
    property.reviews.length > 0
      ? property.reviews.reduce((acc, review) => acc + review.rating, 0) /
        property.reviews.length
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer h-full"
    >
      <Link href={`/location/${property.id}`} className="block h-full">
        <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.altText}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-2xl">
                  {getPropertyTypeIcon(property.propertyType)}
                </span>
              </div>
            )}

            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors duration-200"
            >
              <Heart className="w-4 h-4 text-gray-600" />
            </motion.button>

            {/* Property Type Badge */}
            <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full">
              {getPropertyTypeIcon(property.propertyType)}{" "}
              {property.propertyType}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors duration-200 line-clamp-2">
                  {property.title}
                </h3>
                <div className="flex items-center space-x-1 text-gray-600 text-sm mt-1">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{property.location}</span>
                </div>
              </div>

              {/* Rating */}
              {averageRating > 0 && (
                <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="flex items-center space-x-4 text-gray-600 text-sm mb-3 flex-shrink-0">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Up to {property.maxGuests}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4" />
                <span>
                  {property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Bath className="w-4 h-4" />
                <span>
                  {property.bathrooms} bath{property.bathrooms !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-3 flex-shrink-0">
              <div className="flex flex-wrap gap-1">
                {property.amenities.slice(0, 3).map((amenity, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                {property.amenities.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{property.amenities.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Price and Host Info - Push to bottom */}
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
              <div>
                <span className="font-semibold text-gray-900">
                  {formatPrice(property.pricePerNight)}
                </span>
                <span className="text-gray-600 text-sm"> night</span>
              </div>

              {/* Host Info */}
              <div className="flex items-center space-x-2">
                <Image
                  src={property.host.avatar || "/default-avatar.png"}
                  alt={property.host.name}
                  width={24}
                  height={24}
                  className="rounded-full object-cover flex-shrink-0"
                />
                <span className="text-xs text-gray-600 truncate max-w-20">
                  {property.host.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
