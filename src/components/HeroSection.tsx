"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function HeroSection() {
  const { setIsSearchOpen } = useStore();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear" }}
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2400&h=1600&fit=crop&crop=center&q=90"
          alt="Luxury vacation rental"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-2xl"
        >
          Find your
          <span className="block text-rose-400 drop-shadow-2xl">
            perfect escape
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-lg"
        >
          Discover unique accommodations worldwide with our modern vacation
          rental platform. Book stunning properties with smooth animations and
          exceptional user experience.
        </motion.p>

        {/* Search Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchOpen(true)}
            className="inline-flex items-center px-8 py-4 bg-rose-500 text-white text-lg font-semibold rounded-full hover:bg-rose-600 transition-colors duration-200 shadow-2xl hover:shadow-3xl"
          >
            Start your search
            <svg
              className="ml-2 w-6 h-6"
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: "10K+", label: "Properties" },
            { number: "50+", label: "Countries" },
            { number: "100K+", label: "Happy Guests" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-rose-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute top-20 right-10 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="text-white text-sm">
            <div className="font-semibold">Luxury Villa</div>
            <div className="text-gray-300">Malibu, CA</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 10 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-40 left-10 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="text-white text-sm">
            <div className="font-semibold">Mountain Cabin</div>
            <div className="text-gray-300">Aspen, CO</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
