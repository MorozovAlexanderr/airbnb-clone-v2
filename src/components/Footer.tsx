"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const footerLinks = {
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Safety information", href: "/safety" },
    { name: "Cancellation options", href: "/cancellation" },
    { name: "Our COVID-19 Response", href: "/covid" },
    { name: "Report a neighborhood concern", href: "/report" },
  ],
  community: [
    { name: "Airbnb.org: disaster relief housing", href: "/org" },
    { name: "Support Afghan refugees", href: "/refugees" },
    { name: "Combating discrimination", href: "/discrimination" },
  ],
  hosting: [
    { name: "Try hosting", href: "/host" },
    { name: "AirCover for Hosts", href: "/aircover" },
    { name: "Explore hosting resources", href: "/resources" },
    { name: "Visit our community forum", href: "/forum" },
    { name: "How to host responsibly", href: "/responsible" },
  ],
  about: [
    { name: "Newsroom", href: "/news" },
    { name: "Learn about new features", href: "/features" },
    { name: "Letter from our founders", href: "/founders" },
    { name: "Careers", href: "/careers" },
    { name: "Investors", href: "/investors" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hosting</h3>
            <ul className="space-y-2">
              {footerLinks.hosting.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & App */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-400">Download our app</p>
              <div className="space-y-2">
                <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm">
                  App Store
                </button>
                <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>&copy; 2024 Airbnb Clone, Inc. All rights reserved.</p>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Sitemap
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cookies
              </Link>
            </div>

            {/* Language & Currency */}
            <div className="flex items-center space-x-4 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1">
                <span>English (US)</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1">
                <span>$ USD</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
