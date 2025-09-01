"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, MapPin, Calendar, Users } from "lucide-react";
import { useStore } from "@/store/useStore";
import { SearchFilters } from "@/types";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, searchFilters, setSearchFilters } =
    useStore();
  const [localFilters, setLocalFilters] =
    useState<SearchFilters>(searchFilters);
  const [activeTab, setActiveTab] = useState<"location" | "dates" | "guests">(
    "location"
  );

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  const handleSearch = () => {
    setSearchFilters(localFilters);
    setIsSearchOpen(false);
    const resultsEl = document.getElementById("properties-list");
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLocationSelect = (location: string) => {
    setLocalFilters((prev) => ({ ...prev, location }));
    setActiveTab("dates");
  };

  // Dates and guests are updated inline; no extra handlers needed

  const popularLocations = [
    "New York, NY",
    "Los Angeles, CA",
    "Miami, FL",
    "Chicago, IL",
    "San Francisco, CA",
    "Las Vegas, NV",
    "Orlando, FL",
    "Denver, CO",
    "Seattle, WA",
    "Austin, TX",
  ];

  // Additional filter lists can be added here when used

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsSearchOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Search</h2>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Search Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("location")}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 transition-colors duration-200 ${
                activeTab === "location"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>Where</span>
            </button>
            <button
              onClick={() => setActiveTab("dates")}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 transition-colors duration-200 ${
                activeTab === "dates"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>When</span>
            </button>
            <button
              onClick={() => setActiveTab("guests")}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 transition-colors duration-200 ${
                activeTab === "guests"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Who</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Location Tab */}
            {activeTab === "location" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Where to?
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search destinations"
                      value={localFilters.location || ""}
                      onChange={(e) =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent placeholder:text-gray-600 placeholder:font-medium"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Popular destinations
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {popularLocations.map((location) => (
                      <button
                        key={location}
                        onClick={() => handleLocationSelect(location)}
                        className="text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                      >
                        <p className="font-medium text-gray-900">{location}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Dates Tab */}
            {activeTab === "dates" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    When&apos;s your trip?
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={
                          localFilters.checkIn?.toISOString().split("T")[0] ||
                          ""
                        }
                        onChange={(e) =>
                          setLocalFilters((prev) => ({
                            ...prev,
                            checkIn: e.target.value
                              ? new Date(e.target.value)
                              : undefined,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-800"
                        style={{ colorScheme: "light" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={
                          localFilters.checkOut?.toISOString().split("T")[0] ||
                          ""
                        }
                        onChange={(e) =>
                          setLocalFilters((prev) => ({
                            ...prev,
                            checkOut: e.target.value
                              ? new Date(e.target.value)
                              : undefined,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-800"
                        style={{ colorScheme: "light" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveTab("guests")}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Guests Tab */}
            {activeTab === "guests" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Who&apos;s coming?
                  </h3>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        Number of guests
                      </p>
                      <p className="text-sm text-gray-600">Ages 13 or above</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          setLocalFilters((prev) => ({
                            ...prev,
                            guests: Math.max(1, (prev.guests || 1) - 1),
                          }))
                        }
                        className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:border-gray-600 hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold text-gray-900 text-lg">
                        {localFilters.guests || 1}
                      </span>
                      <button
                        onClick={() =>
                          setLocalFilters((prev) => ({
                            ...prev,
                            guests: (prev.guests || 1) + 1,
                          }))
                        }
                        className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:border-gray-600 hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setActiveTab("dates")}
                    className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors duration-200"
                  >
                    Search
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
