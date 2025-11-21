"use client";

import { BookingModal } from "@/app/(site)/bungalows/[slug]/__components/BungalowDetailsClient";
import { formatIndianCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import CustomTabs from "./_components/customTabs";
import { CustomDropdown } from "./_components/customDropdown";

type Elevation = {
  id: string;
  slug: string;
  title: string;
  images: string[];
  bhk: string;
  floors?: number;
  area: string;
};

type Bungalow = {
  id: string;
  admin_id: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  elevationId: string;
  elevation: Elevation;
  landmark: string;
  latitude: string;
  longitude: string;
  price: string;
  projectName: string;
  slug: string;
  state: string;
  status: boolean;
  title: string;
  totalDays: string;
  type: "stand alone" | "society" | "flat";
};

export default function FloorPlans2() {
  const [filters, setFilters] = useState({
    city: "durgapur",
    bhk: "",
    floors: "",
    type: "society", // Default to "society" type
  });
  const [bungalows, setBungalows] = useState<Bungalow[]>([]);
  const [loading, setLoading] = useState(false);

  const [showAll, setShowAll] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedBungalow, setSelectedBungalow] = useState("");

  const bungalowsRef = useRef<HTMLDivElement>(null);

  // Fetch all filtered data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          ...(filters.city ? { city: filters.city } : {}),
          ...(filters.bhk ? { bhk: filters.bhk } : {}),
          ...(filters.floors ? { floors: filters.floors } : {}),
          ...(filters.type ? { type: filters.type } : {}),
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/elevation/searchElevation?${query}`
        );

        const json = await res.json();
        setBungalows(json.data || []);
        setShowAll(false);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const visibleBungalows = showAll ? bungalows : bungalows.slice(0, 4);

  return (
    <main ref={bungalowsRef} className="flex flex-col items-center">
      {/* Filter Bar */}
      <div className="mb-4 w-full">
        {/* Type Filter */}
        {/* UNCOMMENT IF NEEDED FOR TYPE FILTER************************************************************************* */}
        {/* <CustomTabs
					options={["stand alone", "society"]}
					value={filters.type}
					onChange={(value) =>
						setFilters((prev) => ({ ...prev, type: value || "" }))
					}
				/> */}
      </div>

      <div className="w-full mb-8 flex flex-wrap gap-3">
        {/* City Filter */}
        <CustomDropdown
          options={["durgapur"]}
          value={filters.city}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, city: value || "" }))
          }
          placeholder="All Cities"
          className="w-full sm:w-48"
        />

        {/* BHK Filter */}
        <CustomDropdown
          options={["2", "3", "4", "5"]}
          value={filters.bhk}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, bhk: value || "" }))
          }
          placeholder="BHK"
          className="w-full sm:w-48"
        />

        {/* Floors Filter */}
        <CustomDropdown
          options={["1", "2", "3"]}
          value={filters.floors}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, floors: value || "" }))
          }
          placeholder="All Floors"
          className="w-full sm:w-48"
        />
      </div>

      {/* Loading state with Skeletons */}
      {loading && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="relative w-full md:w-44 h-44 md:h-auto bg-gray-200" />

              {/* Content Skeleton */}
              <div className="flex flex-col p-6 space-y-3 w-full">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
                <div className="h-6 bg-gray-200 rounded w-1/3" />
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-20" />
                  <div className="h-8 bg-gray-200 rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && bungalows.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full py-16">
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center max-w-md">
            <Image
              src="/assets/gallery/completed/2.png"
              alt="No Elevations Found"
              width={300}
              height={200}
              className="rounded-lg shadow-md mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-800 text-center">
              We’re Working On This Location
            </h3>

            <p className="text-gray-500 text-sm text-center mt-2 leading-relaxed">
              Our team is updating floor plans for this area. Please reach out
              to us for personalized assistance.
            </p>

            <Link
              href="/contact"
              className="mt-5 px-6 py-2 bg-[#1E2023] text-white rounded-lg text-sm font-medium hover:bg-black transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {visibleBungalows.map((bungalow, idx) => (
          <>
            {bungalow?.status && (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row"
              >
                {/* Image Section */}
                <div className="relative w-full md:w-44 h-44 md:h-auto">
                  <Image
                    src={bungalow.elevation?.images?.[0] || "/placeholder.jpg"}
                    alt={bungalow.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-semibold px-4 py-1 rounded-full">
                    {bungalow.elevation?.bhk} BHK
                  </span>
                </div>

                {/* Content Section */}
                <div className="flex flex-col p-6">
                  <h3 className="capitalize text-base font-semibold text-gray-900 mb-2">
                    {bungalow.title.replace(/bhk/gi, "BHK")}
                  </h3>
                  <div className="flex flex-wrap items-center text-gray-500 text-sm mb-2 gap-2 md:space-x-4">
                    <span className="flex items-center">
                      {bungalow.elevation?.floors} Floors
                    </span>
                    <span className="flex items-center text-sm text-gray-700">
                      {bungalow.elevation?.area}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="text-black text-lg font-bold">
                      ₹ {formatIndianCurrency(bungalow.price)}
                    </span>
                  </div>
                  <div className="w-full mt-auto flex gap-2 md:space-x-2">
                    <Link
                      href={`/elevation-view/${bungalow.id}`}
                      className="flex items-center justify-center px-3 py-2 border border-transparent text-xs font-medium rounded-lg text-white bg-[#1E2023]"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedBungalow(bungalow.title);
                        setOpen(true);
                      }}
                      className="flex items-center justify-center px-2 py-1 border text-xs font-medium rounded-lg text-black bg-white border-black cursor-pointer"
                    >
                      Enquiry
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>

      {/* View All Plans */}
      {!showAll && bungalows.length > 4 && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 px-6 py-2 bg-primary text-green-700 rounded-lg font-medium cursor-pointer"
        >
          View All Plans
        </button>
      )}

      {/* Booking Modal */}
      {open && <BookingModal bungalow={selectedBungalow} setOpen={setOpen} />}
    </main>
  );
}
