import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const guests = searchParams.get("guests");
    const limit = searchParams.get("limit") || "20";
    const page = searchParams.get("page") || "1";

    // Build where clause
    const where: Record<string, unknown> = {};

    if (location) {
      where.location = {
        contains: location,
        mode: "insensitive",
      };
    }

    if (propertyType) {
      where.propertyType = propertyType;
    }

    if (minPrice || maxPrice) {
      (where.pricePerNight as Record<string, number>) = {};
      if (minPrice)
        (where.pricePerNight as Record<string, number>).gte =
          parseFloat(minPrice);
      if (maxPrice)
        (where.pricePerNight as Record<string, number>).lte =
          parseFloat(maxPrice);
    }

    if (guests) {
      where.maxGuests = {
        gte: parseInt(guests),
      };
    }

    const properties = await prisma.property.findMany({
      where,
      include: {
        host: true,
        images: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
