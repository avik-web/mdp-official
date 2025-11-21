"use client";
import { BookingModal } from "@/app/(site)/bungalows/[slug]/__components/BungalowDetailsClient";
import Amenities from "@/components/echohomes/Amenities";
import Banner from "@/components/echohomes/Banner";
import Portfolio from "@/components/echohomes/Portfolio";
import Heading from "@/components/global/heading";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";

import { BedDouble, Columns2, LandPlot, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";

interface Elevation {
  id: string;
  slug: string;
  title: string;
  images: string[];
  bhk: string;
  floors?: number;
  area: string;
}

interface Bungalow {
  id: string;
  title: string;
  price: string;
  slug: string;
  city: string;
  elevation: Elevation;
  status: boolean;
}

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  className = "",
}: CustomDropdownProps) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default function ElevationsPage() {
  const [filters, setFilters] = useState({
    location: "",
    bhk: "",
    area: "",
  });

  const [bungalows, setBungalows] = useState<Bungalow[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedBungalow, setSelectedBungalow] = useState("");

  const amenitiesRef = useRef<HTMLDivElement>(null);
  const bungalowsRef = useRef<HTMLDivElement>(null);

  /* ----------------- FETCH FROM API ------------------ */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          ...(filters.location ? { city: filters.location } : {}),
          ...(filters.bhk ? { bhk: filters.bhk } : {}),
          ...(filters.area ? { area: filters.area } : {}),
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/elevation/searchElevation?${query}`
        );

        const json = await res.json();
        setBungalows(json.data || []);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  /* ----------- UNIQUE DROPDOWN VALUES (UNCHANGED UI) ----------- */
  const uniqueLocations = useMemo(
    () => Array.from(new Set(bungalows.map((b) => b.city))),
    [bungalows]
  );

  const uniqueBHKs = useMemo(
    () => Array.from(new Set(bungalows.map((b) => b.elevation.bhk))),
    [bungalows]
  );

  const uniqueAreas = useMemo(
    () => Array.from(new Set(bungalows.map((b) => b.elevation.area))),
    [bungalows]
  );

  return (
    <>
      <Nav />
      <Banner />

      <main
        ref={bungalowsRef}
        className="min-h-screen bg-white flex flex-col items-center py-12 px-2"
      >
        <Heading
          title="All Bungalows"
          subtitle="Create The Building You Want Here"
        />
        <div className="w-full max-w-7xl mb-8 flex flex-wrap gap-3 justify-center px-4">
          <CustomDropdown
            options={uniqueLocations.map(
              (loc) => loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase()
            )}
            value={
              filters.location
                ? filters.location.charAt(0).toUpperCase() +
                  filters.location.slice(1).toLowerCase()
                : ""
            }
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                location:
                  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
              }))
            }
            placeholder="All Locations"
            className="w-full sm:w-48"
          />

          <CustomDropdown
            options={uniqueBHKs.map((item) => `${item} BHK`)}
            value={filters.bhk ? `${filters.bhk} BHK` : ""}
            onChange={(value) => {
              // remove " BHK" to store only the number
              const numericValue = value.replace(" BHK", "");
              setFilters((prev) => ({
                ...prev,
                bhk: numericValue,
              }));
            }}
            placeholder="BHK"
            className="w-full sm:w-48"
          />

          <CustomDropdown
            options={uniqueAreas}
            value={filters.area}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, area: value }))
            }
            placeholder="All Areas"
            className="w-full sm:w-48"
          />

          <button
            onClick={() => setFilters({ location: "", bhk: "", area: "" })}
            className="group relative inline-flex items-center px-8 py-2 text-base font-semibold rounded-xl text-black border border-gray-200 active:scale-95 overflow-hidden cursor-pointer"
          >
            <X className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:rotate-180" />
            Reset Filters
          </button>
        </div>

        {/* ---------------- NO RESULTS (KEEP YOUR STYLE – ONLY TEXT CHANGED) ---------------- */}
        {!loading && bungalows.length === 0 && (
          <div className="text-center py-12 px-4">
            <Image
              src="/assets/gallery/completed/2.png"
              alt="No Data"
              width={350}
              height={250}
              className="rounded-lg mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              We Are Working On This Location
            </h3>
            <p className="text-gray-500 mb-6">
              Please contact us for more information.
            </p>
          </div>
        )}

        {/* ----------------- LOADING SKELETON (UNCHANGED) ----------------- */}
        {loading && (
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 h-80 rounded-xl"
              />
            ))}
          </div>
        )}

        {/* ----------------- BUNGALOW CARDS (UNCHANGED UI) ----------------- */}
        {!loading && bungalows.length > 0 && (
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bungalows.map((bungalow, idx) => (
              <div
                key={idx}
                className="bg-white border overflow-hidden rounded-4xl flex flex-col"
              >
                <div className="relative h-72">
                  <Image
                    src={bungalow.elevation.images[0]}
                    alt={bungalow.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-semibold px-4 py-1 rounded-full">
                    {bungalow.elevation.bhk} BHK
                  </span>
                </div>

                <div className="flex-1 flex flex-col p-6">
                  <div className="mb-2">
                    <span className="text-black text-3xl max-sm:text-xl font-semibold">
                      ₹
                      {new Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 0,
                      }).format(Number(bungalow.price))}
                    </span>
                  </div>

                  <h3 className="capitalize text-xl max-sm:text-lg font-medium text-gray-800 mb-2">
                    {/* {bungalow.title} */}
                    {bungalow.title.replace(/bhk/gi, "BHK")}
                  </h3>

                  <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                    <span className="flex items-center gap-2">
                      <BedDouble size={16} />
                      {bungalow.elevation.bhk} BHK
                    </span>
                    <span className="flex items-center gap-2">
                      <Columns2 size={16} />
                      {bungalow.elevation.floors} Floors
                    </span>
                    <span className="flex items-center gap-2">
                      <LandPlot size={16} />
                      {bungalow.elevation.area}
                    </span>
                  </div>

                  <div className="w-full mt-auto flex space-x-2">
                    <Link
                      href={`/elevation-view/${bungalow.id}`}
                      className="w-[140px] flex items-center justify-center px-4 py-2 text-base font-medium rounded-md text-white bg-[#1E2023]"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => {
                        setSelectedBungalow(bungalow.title);
                        setOpen(true);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-primary text-base font-medium rounded-md text-[#1E2023] hover:bg-[#1E2023] hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      Enquiry Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {open && <BookingModal bungalow={selectedBungalow} setOpen={setOpen} />}
      </main>

      <Amenities ref={amenitiesRef} />
      <Portfolio />
      <Footer />
    </>
  );
}
