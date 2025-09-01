import { prisma } from "./db";
import { mockUsers, mockProperties, mockImages, mockReviews } from "./mockData";

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...");

    // Clear existing data
    await prisma.review.deleteMany();
    await prisma.image.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.property.deleteMany();
    await prisma.user.deleteMany();

    console.log("🗑️ Cleared existing data");

    // Create users
    const createdUsers = await Promise.all(
      mockUsers.map(async (user) => {
        return await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            avatar: user.avatar,
          },
        });
      })
    );

    console.log(`👥 Created ${createdUsers.length} users`);

    // Create properties
    const createdProperties = await Promise.all(
      mockProperties.map(async (property) => {
        return await prisma.property.create({
          data: {
            title: property.title,
            description: property.description,
            pricePerNight: property.pricePerNight,
            location: property.location,
            latitude: property.latitude,
            longitude: property.longitude,
            propertyType: property.propertyType,
            maxGuests: property.maxGuests,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            amenities: property.amenities,
            hostId:
              createdUsers.find((u) => u.email === property.host.email)?.id ||
              createdUsers[0].id,
          },
        });
      })
    );

    console.log(`🏠 Created ${createdProperties.length} properties`);

    // Create images
    const createdImages = await Promise.all(
      mockImages.map(async (image) => {
        const property = createdProperties.find(
          (p) =>
            mockProperties.find((mp) => mp.id === image.propertyId)?.title ===
            p.title
        );
        if (!property) return null;

        return await prisma.image.create({
          data: {
            propertyId: property.id,
            url: image.url,
            altText: image.altText,
            isPrimary: image.isPrimary,
          },
        });
      })
    );

    console.log(`📸 Created ${createdImages.filter(Boolean).length} images`);

    // Create reviews
    const createdReviews = await Promise.all(
      mockReviews.map(async (review) => {
        const property = createdProperties.find(
          (p) =>
            mockProperties.find((mp) => mp.id === review.propertyId)?.title ===
            p.title
        );
        const user = createdUsers.find((u) => u.email === review.user.email);

        if (!property || !user) return null;

        return await prisma.review.create({
          data: {
            propertyId: property.id,
            userId: user.id,
            rating: review.rating,
            comment: review.comment,
            photos: review.photos,
          },
        });
      })
    );

    console.log(`⭐ Created ${createdReviews.filter(Boolean).length} reviews`);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}
