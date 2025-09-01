"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, User, Globe } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsSearchOpen, user } = useStore();

  const navItems = [
    { label: "Stays", href: "/" },
    { label: "Experiences", href: "/experiences" },
    { label: "Online Experiences", href: "/online-experiences" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold text-rose-500"
            >
              airbnb
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center space-x-3 px-4 py-2 rounded-full border border-gray-300 hover:shadow-md transition-all duration-200 bg-white"
          >
            <Search className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Start your search</span>
          </motion.button>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Host Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Become a Host
            </motion.button>

            {/* Globe Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <Globe className="w-5 h-5 text-gray-700" />
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-full border border-gray-300 hover:shadow-md transition-all duration-200 bg-white"
              >
                <Menu className="w-4 h-4 text-gray-700" />
                <User className="w-4 h-4 text-gray-700" />
              </motion.button>

              {/* User Menu Dropdown */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          Profile
                        </Link>
                        <Link
                          href="/bookings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          My Bookings
                        </Link>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/signup"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-full border border-gray-300 hover:shadow-md transition-all duration-200 bg-white"
          >
            <Search className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Start your search</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
