"use client";

import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { useStore } from "@/store/useStore";
import { useProperties } from "@/hooks/useProperties";

export default function FeaturedProperties() {
  const { searchFilters, resetFilters } = useStore();
  const { properties, loading, error } = useProperties(searchFilters, 1, 20);

  const hasActiveFilters = Boolean(
    (searchFilters.location && searchFilters.location.trim() !== "") ||
      searchFilters.guests ||
      searchFilters.priceMin !== undefined ||
      searchFilters.priceMax !== undefined ||
      (searchFilters.propertyType &&
        searchFilters.propertyType.trim() !== "") ||
      (searchFilters.amenities && searchFilters.amenities.length > 0)
  );

  const filteredProperties = hasActiveFilters
    ? properties
    : properties.slice(0, 6);

  return (
    <section id="properties-list" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Try again
            </button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {hasActiveFilters ? "Search results" : "Featured properties"}
              </h2>
              <div className="text-lg text-gray-600 max-w-2xl mx-auto">
                {hasActiveFilters ? (
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <span>
                      {filteredProperties.length} stay
                      {filteredProperties.length === 1 ? "" : "s"} found
                    </span>
                    <button
                      onClick={resetFilters}
                      className="text-rose-600 hover:text-rose-700 underline"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <p>
                    Handpicked accommodations that offer exceptional experiences
                    and stunning locations
                  </p>
                )}
              </div>
            </motion.div>

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProperties.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  No properties match your filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
                >
                  Reset filters
                </button>
              </div>
            )}

            {/* View All Button */}
            {!hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mt-16"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  View all properties
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
