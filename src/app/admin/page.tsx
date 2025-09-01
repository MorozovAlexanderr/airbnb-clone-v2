"use client";

import { useState } from "react";
import Link from "next/link";
import { PropertyService } from "@/lib/services/propertyService";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSeedDatabase = async () => {
    try {
      setLoading(true);
      setMessage("");
      await PropertyService.seedDatabase();
      setMessage(
        "Database seeded successfully! Refresh the page to see the changes."
      );
    } catch (error) {
      setMessage(
        `Error: ${
          error instanceof Error ? error.message : "Failed to seed database"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Database Management
              </h2>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Seed Database
                </h3>
                <p className="text-gray-600 mb-4">
                  This will populate the database with sample properties, users,
                  images, and reviews.
                </p>

                <button
                  onClick={handleSeedDatabase}
                  disabled={loading}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Seeding...
                    </>
                  ) : (
                    "Seed Database"
                  )}
                </button>

                {message && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      message.includes("Error")
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-green-50 text-green-700 border border-green-200"
                    }`}
                  >
                    {message}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                API Endpoints
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-3">
                  <div>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      GET /api/properties
                    </code>
                    <p className="text-gray-600 text-sm mt-1">
                      Fetch all properties with optional filtering
                    </p>
                  </div>
                  <div>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      GET /api/properties/[id]
                    </code>
                    <p className="text-gray-600 text-sm mt-1">
                      Fetch a specific property by ID
                    </p>
                  </div>
                  <div>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      POST /api/seed
                    </code>
                    <p className="text-gray-600 text-sm mt-1">
                      Seed the database with sample data
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Links
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-3">
                  <Link
                    href="/"
                    className="block text-blue-600 hover:text-blue-700 underline"
                  >
                    Home Page
                  </Link>
                  <a
                    href="/api/properties"
                    className="block text-blue-600 hover:text-blue-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Properties API
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
