"use client";

import { motion } from "framer-motion";
import { getPropertyTypeIcon } from "@/lib/utils";

const categories = [
  { id: "beach", name: "Beach", icon: "🏖️", description: "Oceanfront escapes" },
  {
    id: "mountain",
    name: "Mountain",
    icon: "🏔️",
    description: "Alpine adventures",
  },
  { id: "city", name: "City", icon: "🏙️", description: "Urban experiences" },
  {
    id: "countryside",
    name: "Countryside",
    icon: "🌾",
    description: "Rural retreats",
  },
  { id: "lake", name: "Lake", icon: "🏞️", description: "Waterside living" },
  { id: "forest", name: "Forest", icon: "🌲", description: "Nature immersion" },
  { id: "desert", name: "Desert", icon: "🏜️", description: "Arid landscapes" },
  {
    id: "tropical",
    name: "Tropical",
    icon: "🌴",
    description: "Island paradises",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore by property type
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover unique accommodations that match your travel style and
            preferences
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
                {/* Icon */}
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors duration-200">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                  {category.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-1 bg-rose-500 mx-auto rounded-full"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Explore all categories
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
      </div>
    </section>
  );
}
