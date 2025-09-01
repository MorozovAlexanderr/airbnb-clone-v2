"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Utensils,
  Car,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatPrice, calculateDays, calculateTotalPrice } from "@/lib/utils";
import { useProperty } from "@/hooks/useProperty";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const amenitiesIcons = {
  WiFi: Wifi,
  Pool: Waves,
  Kitchen: Utensils,
  Parking: Car,
};

export default function LocationDetail() {
  const params = useParams();
  const propertyId = params.id as string;
  const { property, loading, error } = useProperty(propertyId);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error ? `Error: ${error}` : "Property not found"}
          </h1>
          <Link href="/" className="text-rose-500 hover:text-rose-600">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const primaryImage =
    property.images.find((img) => img.isPrimary) || property.images[0];
  const averageRating =
    property.reviews.length > 0
      ? property.reviews.reduce((acc, review) => acc + review.rating, 0) /
        property.reviews.length
      : 0;

  const handleBooking = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const days = calculateDays(checkIn, checkOut);
    const totalPrice = calculateTotalPrice(
      property.pricePerNight,
      checkIn,
      checkOut
    );

    alert(
      `Booking request sent! Total: ${formatPrice(totalPrice)} for ${days} days`
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to search
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
                {averageRating > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{averageRating.toFixed(1)}</span>
                    <span>({property.reviews.length} reviews)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <Share className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-2 lg:row-span-2">
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => {
                  setSelectedImageIndex(0);
                  setIsImageModalOpen(true);
                }}
              >
                <img
                  src={primaryImage?.url || "/placeholder.jpg"}
                  alt={primaryImage?.altText || property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>

            {/* Secondary Images */}
            {property.images.slice(1, 5).map((image, index) => (
              <div
                key={image.id}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => {
                  setSelectedImageIndex(index + 1);
                  setIsImageModalOpen(true);
                }}
              >
                <img
                  src={image.url}
                  alt={image.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                {/* Show "View all photos" on the last visible image if there are more */}
                {index === 3 && property.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      +{property.images.length - 5} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View All Photos Button */}
          {property.images.length > 5 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsImageModalOpen(true)}
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                View all {property.images.length} photos
              </button>
            </div>
          )}
        </motion.div>

        {/* Property Details and Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Host Info */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={property.host.avatar || "/default-avatar.png"}
                    alt={property.host.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Hosted by {property.host.name}
                    </h3>
                    <p className="text-gray-600">Superhost</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                About this place
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {property.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">
                    Up to {property.maxGuests} guests
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bed className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">
                    {property.bedrooms} bedroom
                    {property.bedrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">
                    {property.bathrooms} bathroom
                    {property.bathrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">
                    {getPropertyTypeIcon(property.propertyType)}
                  </span>
                  <span className="text-gray-700">{property.propertyType}</span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => {
                  const Icon =
                    amenitiesIcons[amenity as keyof typeof amenitiesIcons];
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      {Icon ? (
                        <Icon className="w-5 h-5 text-gray-600" />
                      ) : (
                        <div className="w-5 h-5 bg-gray-300 rounded" />
                      )}
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews */}
            {property.reviews.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {averageRating.toFixed(1)} · {property.reviews.length} reviews
                </h3>
                <div className="space-y-4">
                  {property.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-4"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <img
                          src={review.user.avatar || "/default-avatar.png"}
                          alt={review.user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {review.user.name}
                          </p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(property.pricePerNight)}
                  </span>
                  <span className="text-gray-600">night</span>
                </div>
                <p className="text-gray-600 text-sm">+ taxes and fees</p>
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          checkIn: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-800"
                      style={{ colorScheme: "light" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          checkOut: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-800"
                      style={{ colorScheme: "light" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <select
                    value={bookingData.guests}
                    onChange={(e) =>
                      setBookingData((prev) => ({
                        ...prev,
                        guests: parseInt(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    {[...Array(property.maxGuests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} guest{i !== 0 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Book Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBooking}
                className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors duration-200"
              >
                Reserve
              </motion.button>

              <p className="text-center text-gray-600 text-sm mt-4">
                You won&apos;t be charged yet
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsImageModalOpen(false)}
          >
            <div className="absolute top-4 right-4 z-60">
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="h-full flex items-center justify-center p-4">
              <div
                className="max-w-6xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <img
                    src={property.images[selectedImageIndex]?.url}
                    alt={property.images[selectedImageIndex]?.altText}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />

                  {/* Image Navigation */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex((prev) =>
                            prev === 0 ? property.images.length - 1 : prev - 1
                          );
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex((prev) =>
                            prev === property.images.length - 1 ? 0 : prev + 1
                          );
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                    {selectedImageIndex + 1} / {property.images.length}
                  </div>
                </motion.div>

                {/* Thumbnail Strip */}
                <div className="mt-6 flex justify-center">
                  <div className="flex space-x-2 overflow-x-auto max-w-full pb-2">
                    {property.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === selectedImageIndex
                            ? "border-white"
                            : "border-transparent opacity-60 hover:opacity-80"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.altText}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getPropertyTypeIcon(propertyType: string): string {
  const icons: Record<string, string> = {
    beach: "🏖️",
    mountain: "🏔️",
    city: "🏙️",
    countryside: "🌾",
    lake: "🏞️",
    forest: "🌲",
    desert: "🏜️",
    tropical: "🌴",
  };

  return icons[propertyType.toLowerCase()] || "🏠";
}
