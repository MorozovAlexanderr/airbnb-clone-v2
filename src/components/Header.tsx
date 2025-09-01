"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, User, Globe, Sparkles, X } from "lucide-react";
import { useStore } from "@/store/useStore";

interface HeaderProps {
  variant?: "hero" | "default";
}

export default function Header({ variant = "hero" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsSearchOpen, user } = useStore();

  const navItems = [
    { label: "Stays", href: "/" },
    { label: "Experiences", href: "/experiences" },
    { label: "Online Experiences", href: "/online-experiences" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Determine if we should use hero styling
  const isHeroMode = variant === "hero" && !isScrolled;
  const isDefaultMode = variant === "default" || isScrolled;

  return (
    <>
      <header
        className={`${
          isScrolled
            ? "fixed top-0 left-0 right-0"
            : "absolute top-0 left-0 right-0"
        } z-50 transition-all duration-300 ${
          isDefaultMode
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group flex-shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div
                  className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                    isDefaultMode
                      ? "bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent"
                      : "text-white"
                  }`}
                >
                  airbnb
                </div>
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles
                    className={`w-2 h-2 sm:w-3 sm:h-3 transition-colors duration-300 ${
                      isDefaultMode ? "text-amber-400" : "text-white"
                    }`}
                  />
                </motion.div>
              </motion.div>
            </Link>

            {/* Center Section: Navigation + Search */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Desktop Navigation */}
              <nav className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative font-medium transition-all duration-300 group ${
                      isDefaultMode
                        ? "text-gray-700 hover:text-gray-900"
                        : "text-white hover:text-gray-100"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        isDefaultMode
                          ? "bg-gradient-to-r from-rose-500 to-pink-500"
                          : "bg-white"
                      }`}
                    ></span>
                  </Link>
                ))}
              </nav>

              {/* Desktop Search Bar */}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsSearchOpen(true)}
                className={`flex items-center space-x-3 px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 shadow-sm ${
                  isDefaultMode
                    ? "border border-gray-300/60 hover:border-gray-400/80 hover:shadow-lg bg-white/80 backdrop-blur-sm"
                    : "border border-white/30 hover:border-white/50 hover:shadow-lg bg-white/10 backdrop-blur-sm"
                }`}
              >
                <Search
                  className={`w-4 h-4 transition-colors duration-300 ${
                    isDefaultMode ? "text-gray-600" : "text-white"
                  }`}
                />
                <span
                  className={`font-medium transition-colors duration-300 ${
                    isDefaultMode ? "text-gray-700" : "text-white"
                  }`}
                >
                  Start your search
                </span>
                <div
                  className={`w-1 h-1 rounded-full animate-pulse transition-colors duration-300 ${
                    isDefaultMode ? "bg-gray-400" : "bg-white"
                  }`}
                ></div>
              </motion.button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Host Button - Hidden on mobile */}
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className={`hidden sm:block font-medium transition-all duration-300 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base ${
                  isDefaultMode
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                    : "text-white hover:text-gray-100 hover:bg-white/10"
                }`}
              >
                Become a Host
              </motion.button>

              {/* Globe Icon - Hidden on mobile */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className={`hidden sm:block p-2 sm:p-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
                  isDefaultMode ? "hover:bg-gray-100/80" : "hover:bg-white/10"
                }`}
              >
                <Globe
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                    isDefaultMode ? "text-gray-700" : "text-white"
                  }`}
                />
              </motion.button>

              {/* User Menu - Desktop */}
              <div className="hidden sm:block relative">
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`flex items-center space-x-2 p-1.5 sm:p-2 rounded-full transition-all duration-300 shadow-sm ${
                    isDefaultMode
                      ? "border border-gray-300/60 hover:border-gray-400/80 hover:shadow-lg bg-white/80 backdrop-blur-sm"
                      : "border border-white/30 hover:border-white/50 hover:shadow-lg bg-white/10 backdrop-blur-sm"
                  }`}
                >
                  <Menu
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 ${
                      isDefaultMode ? "text-gray-700" : "text-white"
                    }`}
                  />
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDefaultMode
                        ? "bg-gradient-to-br from-gray-400 to-gray-600"
                        : "bg-white/20"
                    }`}
                  >
                    <User
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-colors duration-300 ${
                        isDefaultMode ? "text-white" : "text-white"
                      }`}
                    />
                  </div>
                </motion.button>

                {/* User Menu Dropdown */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/60 py-2 overflow-hidden"
                    >
                      {user ? (
                        <>
                          <div className="px-3 py-2 border-b border-gray-100/60 bg-gradient-to-r from-gray-50/50 to-transparent">
                            <p className="text-sm font-semibold text-gray-900">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {user.email}
                            </p>
                          </div>
                          <Link
                            href="/profile"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-rose-50/50 hover:to-pink-50/50 transition-all duration-200 font-medium"
                          >
                            Profile
                          </Link>
                          <Link
                            href="/bookings"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-rose-50/50 hover:to-pink-50/50 transition-all duration-200 font-medium"
                          >
                            My Bookings
                          </Link>
                          <button className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-rose-50/50 hover:to-pink-50/50 transition-all duration-200 font-medium">
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-rose-50/50 hover:to-pink-50/50 transition-all duration-200 font-medium"
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/signup"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-rose-50/50 hover:to-pink-50/50 transition-all duration-200 font-medium"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`sm:hidden p-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
                  isDefaultMode
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                    : "text-white hover:text-gray-100 hover:bg-white/10"
                }`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="sm:hidden pb-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSearchOpen(true)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-full transition-all duration-300 shadow-sm text-sm ${
                isDefaultMode
                  ? "border border-gray-300/60 hover:border-gray-400/80 hover:shadow-lg bg-white/80 backdrop-blur-sm"
                  : "border border-white/30 hover:border-white/50 hover:shadow-lg bg-white/10 backdrop-blur-sm"
              }`}
            >
              <Search
                className={`w-4 h-4 transition-colors duration-300 ${
                  isDefaultMode ? "text-gray-600" : "text-white"
                }`}
              />
              <span
                className={`font-medium transition-colors duration-300 ${
                  isDefaultMode ? "text-gray-700" : "text-white"
                }`}
              >
                Start your search
              </span>
              <div
                className={`w-1 h-1 rounded-full animate-pulse transition-colors duration-300 ${
                  isDefaultMode ? "bg-gray-400" : "bg-white"
                }`}
              ></div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl z-50 sm:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/60">
                  <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100/80 transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6">
                  <div className="space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-all duration-200 px-3"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* User Section */}
                <div className="p-6 border-t border-gray-200/60">
                  {user ? (
                    <div className="space-y-4">
                      <div className="pb-3 border-b border-gray-100/60">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-all duration-200 px-3 font-medium"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/bookings"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-all duration-200 px-3 font-medium"
                      >
                        My Bookings
                      </Link>
                      <button className="block w-full text-left py-3 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-all duration-200 px-3 font-medium">
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-all duration-200 px-3 font-medium"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-lg transition-all duration-200 px-3 font-medium"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
