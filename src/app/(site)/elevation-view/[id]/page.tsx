"use client";

import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import CollapsibleSection from "./collapsibleSection";
// import staticData from "@/data/locationStatus.json";
import {
  AlertCircle,
  Building2,
  Home,
  Loader,
  MapPin,
  Phone,
  Share2,
  Square,
  Timer,
  Zap,
  Droplets,
  Palette,
  DoorOpen,
  Frame,
  Layers,
  CheckCircle,
  Star,
  Award,
  Calculator,
  ArrowRight,
  Info,
  Shield,
  Download,
  X,
  Maximize2,
  Wind,
  Fan,
  Lightbulb,
  Plug,
  Flame,
  AirVent,
  ToggleLeft,
  Grid3x3,
  Tv,
  Building,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageCarousel from "./imageCarosel";
import InfoCard from "./infoCard";
import Badge from "./badge";
import type { Property } from "@/types/elevationView.type";

export default function PropertyDetailsPage() {
  const params = useParams();
  const tenantId = params?.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [fullScreenTitle, setFullScreenTitle] = useState<string>("");

  useEffect(() => {
    if (!tenantId) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/elevation-tenant/${tenantId}`
        );

        if (!res.ok) throw new Error("Failed to fetch property details");

        const data = await res.json();
        setProperty(data.locationStatus);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load property details"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [tenantId]);

  // Memoized calculations
  const calculations = useMemo(() => {
    if (!property) return null;

    const pricePerSqFt = Math.round(
      Number(property.price) / Number(property.elevation.area)
    );
    const totalElectricalPoints =
      property.elevation.electrical?.reduce((total, elec) => {
        const roomPoints =
          elec.rooms?.reduce(
            (roomTotal, room) =>
              roomTotal + Object.values(room.points).reduce((a, b) => a + b, 0),
            0
          ) || 0;
        const directPoints = elec.points
          ? Object.values(elec.points).reduce((a, b) => a + b, 0)
          : 0;
        return total + roomPoints + directPoints;
      }, 0) || 0;

    return {
      pricePerSqFt,
      totalElectricalPoints,
      estimatedCompletion: property.totalDays,
    };
  }, [property]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Nav />
        <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center p-8">
            <div className="relative mb-6">
              <Loader className="animate-spin h-16 w-16 text-black mx-auto" />
              <div className="absolute inset-0 h-16 w-16 border-4 border-gray-200 rounded-full mx-auto"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Loading Property Details
            </h3>
            <p className="text-gray-600">
              Please wait while we fetch the information...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Nav />
        <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-red-50 to-white">
          <div className="text-center p-8 max-w-md">
            <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Unable to Load Property
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Nav />
        <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center p-8">
            <div className="bg-gray-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Building2 className="h-10 w-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Property Not Found
            </h3>
            <p className="text-gray-600">
              The requested property could not be found.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = property.elevation?.images || [];

  const formatPrice = (price: string) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(price));

  const handleShare = async () => {
    setShareLoading(true);
    const shareData: ShareData = {
      title: property.title,
      text: `${property.title} • ${property.elevation.bhk} • ${
        property.elevation.area
      } sq.ft • ${formatPrice(property.price)}`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url || "");
        alert("Property link copied to clipboard!");
      }
    } catch (e) {
      console.error("Share failed:", e);
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url || "");
        alert("Link copied to clipboard!");
      } catch {
        alert("Unable to share or copy link");
      }
    } finally {
      setShareLoading(false);
    }
  };

  const handleDownloadImage = async (imageUrl: string, title: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title.replace(/\s+/g, "_")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  const openFullScreen = (imageUrl: string, title: string) => {
    setFullScreenImage(imageUrl);
    setFullScreenTitle(title);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
    setFullScreenTitle("");
  };

  const getElectricalIcon = (key: string) => {
    const lowerKey = key.toLowerCase();
    
    // AC Point
    if (lowerKey.includes("ac") || lowerKey.includes("a/c")) {
      return <Wind className="w-4 h-4 text-blue-600" />;
    }
    // Fan Point
    if (lowerKey.includes("fan")) {
      return <Fan className="w-4 h-4 text-purple-600" />;
    }
    // Light Point
    if (lowerKey.includes("light") || lowerKey.includes("lamp")) {
      return <Lightbulb className="w-4 h-4 text-yellow-600" />;
    }
    // Plug Point
    if (lowerKey.includes("plug")) {
      return <Plug className="w-4 h-4 text-orange-600" />;
    }
    // Geyser Point
    if (lowerKey.includes("geyser")) {
      return <Flame className="w-4 h-4 text-red-600" />;
    }
    // Chimney Point
    if (lowerKey.includes("chimney")) {
      return <AirVent className="w-4 h-4 text-gray-600" />;
    }
    // Exhaust Point
    if (lowerKey.includes("exhaust")) {
      return <AirVent className="w-4 h-4 text-green-600" />;
    }
    // Mixture/Mixer Point
    if (lowerKey.includes("mixture") || lowerKey.includes("mixer")) {
      return <Plug className="w-4 h-4 text-indigo-600" />;
    }
    // TV Point
    if (lowerKey.includes("tv")) {
      return <Tv className="w-4 h-4 text-cyan-600" />;
    }
    // Wall Point
    if (lowerKey.includes("wall")) {
      return <Plug className="w-4 h-4 text-pink-600" />;
    }
    // Switch Board / Distribution Board
    if (lowerKey.includes("board") || lowerKey.includes("distribution")) {
      return <Grid3x3 className="w-4 h-4 text-slate-700" />;
    }
    // Switch Point (Two-Way or Regular)
    if (lowerKey.includes("switch")) {
      return <ToggleLeft className="w-4 h-4 text-gray-700" />;
    }
    // Default
    return <Zap className="w-4 h-4 text-gray-600" />;
  };

  const renderElectricalPoints = (points: Record<string, number>) => {
    const entries = Object.entries(points).filter(([, v]) => v > 0);
    if (entries.length === 0) {
      return (
        <div className="flex items-center justify-center py-4 text-gray-500">
          <Info className="w-4 h-4 mr-2" />
          <span className="text-sm">No electrical points configured</span>
        </div>
      );
    }
    return (
      <div className="space-y-2">
        {entries.map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span className="flex items-center gap-2 text-gray-800 font-medium">
              {getElectricalIcon(key)}
              <span className="capitalize">{key}</span>
            </span>
            <Badge variant="primary" size="sm">
              {value} {value === 1 ? "point" : "points"}
            </Badge>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white font-sans">
      <Nav />

      {images.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="relative w-full max-w-7xl">
            {/* Carousel */}
            <ImageCarousel images={images} altText="Property visualization" />

            {/* Premium Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="success" size="lg">
                <Star className="w-4 h-4 mr-1" />
                Premium Property
              </Badge>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto p-4 lg:p-6 flex-1 max-w-7xl">
        {/* Enhanced Header*/}
        <div className="bg-white rounded-2xl  p-6 lg:p-8 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 capitalize">
                  {property.title.replace(/bhk/gi, "BHK")}
                </h1>
                
                <Badge variant={property.status ? "success" : "default"}>
                  {property.status ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-gray-600 ">
                <MapPin className="h-5 w-5 text-black capitalize" />
                <span className="font-medium capitalize">
                  {property.city}
                  {property.state && `, ${property.state}`}
                  {property.country && `, ${property.country}`}
                </span>
              </div>
            </div>

            <div className="text-black  rounded-xl">
              <div className="text-3xl lg:text-4xl font-bold mb-2">
                {formatPrice(property.price)}
              </div>
              <div className="text-black-300 mb-2">Total Estimated Cost</div>
            </div>
          </div>
        </div>

        {/* Enhanced Key Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <InfoCard
            icon={Home}
            title="Bedrooms & Halls"
            value={property.elevation.bhk}
            // subtitle="Bedrooms & Halls"
          />
          <InfoCard
            icon={Building2}
            title="Floors"
            value={property.elevation.floors}
            // subtitle="Total Levels"
          />
          <InfoCard
            icon={Square}
            title="Built-up Area"
            value={property.elevation.area}
            // subtitle="Square Feet"
          />
          <InfoCard
            icon={Timer}
            title=" Estimated  construction Time"
            value={`${property.totalDays} Days`}
            // subtitle="Construction Period"
          />
        </div>

        {/* Project Description * **/}
        <CollapsibleSection
          title="Project Overview"
          icon={Info}
          defaultOpen={true}
        >
          <div className="prose prose-gray max-w-none">
            <p className="capitalize text-gray-700 leading-relaxed whitespace-pre-line mb-6">
              {property.elevation.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl">
              {property.projectName && (
                <div>
                  <span className="font-semibold text-gray-900 block mb-1">
                    Project Name
                  </span>
                  <span className="Capitalize text-gray-700 capitalize">
                    {property.projectName}
                  </span>
                </div>
              )}
              {property.type && (
                <div>
                  <span className="font-semibold text-gray-900 block mb-1"> 
                    Property Type
                  </span>
                  <span className="text-gray-700 capitalize">
                    {property.type}
                  </span>
                </div>
              )}
              <div>
                <span className="font-semibold text-gray-900 block mb-1">
                  Lift Facility
                </span>
                <div className="flex items-center gap-2">
                  {property.elevation.is_lift ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-600 font-medium">
                        Available
                      </span>
                    </>
                  ) : (
                    <>
                      {/* <Circle className="w-5 h-5 text-gray-400" /> */}
                      <span className="text-gray-500">Not Available</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Enhanced Area Division */}
        {property.elevation.areadivision?.length > 0 && (
          <CollapsibleSection
            title="Space Planning"
            icon={Square}
            count={property.elevation.areadivision.length}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {property.elevation.areadivision.map((area, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200  transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-black text-white rounded-lg">
                        <Square className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-gray-900 capitalize">
                        {area.title}
                      </span>
                    </div>
                    <Badge variant="info">{area.area}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Enhanced Structure Materials */}
        {property.elevation.structure?.length > 0 && (
          <CollapsibleSection
            title="Construction Materials"
            icon={Layers}
            count={property.elevation.structure.length}
          >
            <div className="space-y-6">
              {property.elevation.structure.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-gray-200 "
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Layers className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize mb-3">
                        {s.materials}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {s.brands.map((brand, bIdx) => (
                          <Badge key={bIdx} variant="default">
                            <Award className="w-3 h-3 mr-1" />
                            {brand}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Enhanced Tiles & Flooring */}
        {property.elevation.tiles?.length > 0 && (
          <CollapsibleSection
            title="Tiles & Flooring"
            icon={Square}
            count={property.elevation.tiles.length}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {property.elevation.tiles.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-gray-200 "
                >
                  <h3 className="flex items-center gap-3 font-semibold text-gray-900 capitalize mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Square className="w-5 h-5 text-blue-600" />
                    </div>
                    {t.title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Available Brands:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {t.brands.map((brand, bIdx) => (
                          <Badge key={bIdx} variant="primary">
                            {brand}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Size Options:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {t.measurement.map((m, mIdx) => (
                          <Badge key={mIdx} variant="info">
                            {m}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Enhanced Doors */}
        {property.elevation.doors?.length > 0 && (
          <CollapsibleSection
            title="Doors & Entrances"
            icon={DoorOpen}
            count={property.elevation.doors.length}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {property.elevation.doors.map((d, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-gray-200 "
                >
                  <h3 className="flex items-center gap-3 font-semibold text-gray-900 capitalize mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DoorOpen className="w-5 h-5 text-green-600" />
                    </div>
                    {d.title}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Materials:
                      </p>
                      <div className="space-y-1">
                        {d.material.map((mat, mIdx) => (
                          <Badge key={mIdx} variant="default" size="sm">
                            {mat}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Dimensions:
                      </p>
                      <div className="space-y-1">
                        {d.measurement.map((m, mIdx) => (
                          <Badge key={mIdx} variant="info" size="sm">
                            {m}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Area Name:
                      </p>
                      <div className="space-y-1">
                        {d.area?.map((m, mIdx) => (
                          <Badge key={mIdx} variant="info" size="sm">
                            {m}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Enhanced Windows */}
        {property.elevation.windows?.length > 0 && (
          <CollapsibleSection
            title="Windows & Ventilation"
            icon={Frame}
            count={property.elevation.windows.length}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {property.elevation.windows.map((w, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-gray-200"
                >
                  <h3 className="flex items-center gap-3 font-semibold text-gray-900 capitalize mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Frame className="w-5 h-5 text-purple-600" />
                    </div>
                    {w.type}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Materials */}
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Materials:
                      </p>
                      <div className="space-y-1">
                        {w.material?.map((mat, mIdx) => (
                          <Badge key={mIdx} variant="default" size="sm">
                            {mat}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Dimensions */}
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Dimensions:
                      </p>
                      <div className="space-y-1">
                        {w.measurement?.map((m, mIdx) => (
                          <Badge key={mIdx} variant="info" size="sm">
                            {m}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Area Name */}
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Area Name:
                      </p>
                      <div className="space-y-1 text-black capitalize">
                        {w.area?.map((a, aIdx) => (
                          <Badge key={aIdx} variant="primary" size="sm">
                            {a}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Enhanced Floor Plans */}
        {property.elevation.plans?.length > 0 && (
          <CollapsibleSection
            title="Architectural Plans"
            icon={Frame}
            count={property.elevation.plans.length}
          >
            <div className="grid gap-8 lg:grid-cols-2">
              {property.elevation.plans.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl  overflow-hidden border border-gray-200"
                >
                  <div className="p-4 bg-gradient-to-r from-gray-100 to-white border-b">
                    <h3 className="capitalize flex items-center gap-3 font-semibold text-gray-900">
                      <Frame className="w-5 h-5 text-gray-700" />
                      {p.title}
                    </h3>
                  </div>
                  <div className="relative group">
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={800}
                      height={600}
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                        <button
                          onClick={() => openFullScreen(p.image, p.title)}
                          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors "
                        >
                          <Maximize2 className="w-4 h-4" />
                          View Full Size
                        </button>
                        <button
                          onClick={() => handleDownloadImage(p.image, p.title)}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors "
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Enhanced Electrical Details */}
        {property.elevation.electrical?.length > 0 && (
          <CollapsibleSection
            title="Electrical Systems"
            icon={Zap}
            count={calculations?.totalElectricalPoints || 0}
          >
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {property.elevation.electrical.map((elec, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200  overflow-hidden"
                >
                  <div className="p-4">
                    {elec.brands && elec.brands.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600 mb-2 ">
                          Recommended Brands:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {elec.brands.map((brand, bIdx) => (
                            <Badge key={bIdx} variant="primary" size="lg">
                              <Shield className="w-4 h-4 mr-1" />
                              {brand}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {elec.rooms && elec.rooms.length > 0 && (
                      <div className="space-y-4">
                        {elec.rooms.map((room, rIdx) => (
                          <div key={rIdx} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3 font-medium text-gray-900">
                              <Building className="w-4 h-4" />
                              <span className="capitalize">{room.name}</span>
                            </div>
                            {renderElectricalPoints(room.points)}
                          </div>
                        ))}
                      </div>
                    )}

                    {elec.area && elec.points && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3 font-medium text-gray-900">
                          <Building2 className="w-4 h-4" />
                          <span className="capitalize">{elec.area}</span>
                        </div>
                        {renderElectricalPoints(elec.points)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Enhanced Plumbing Details */}
        {property.elevation.plumbing?.length > 0 && (
          <CollapsibleSection
            title="Plumbing Systems"
            icon={Droplets}
            count={property.elevation.plumbing.length}
          >
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {property.elevation.plumbing.map((plumb, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200  overflow-hidden"
                >
                  {/* <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Droplets className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-semibold text-gray-900 capitalize">
                        {plumb.area || "Plumbing Setup"}
                      </span>
                    </div>
                  </div> */}

                  <div className="p-4 space-y-4">
                    {plumb.brands && plumb.brands.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Recommended Brands:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {plumb.brands.map((brand, bIdx) => (
                            <Badge key={bIdx} variant="info" size="lg">
                              <Award className="w-4 h-4 mr-1" />
                              {brand}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {plumb.materials && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Materials:
                        </p>
                        <Badge variant="default">{plumb.materials}</Badge>
                      </div>
                    )}

                    {plumb.area && plumb.points && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3 font-medium text-gray-900">
                          <Building2 className="w-4 h-4" />
                          <span className="capitalize">{plumb.area}</span>
                        </div>
                        <div className="space-y-2">
                          {Object.entries(plumb.points)
                            .filter(([, value]) => value > 0)
                            .map(([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between p-2 bg-white rounded"
                              >
                                <span className="flex items-center gap-2 text-gray-800">
                                  <Droplets className="w-4 h-4 text-blue-500" />
                                  <span className="capitalize text-sm">
                                    {key}
                                  </span>
                                </span>
                                <Badge variant="info" size="sm">
                                  {value} {value === 1 ? "point" : "points"}
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Enhanced Paint & Finishing */}
        {property.elevation.paint?.length > 0 && (
          <CollapsibleSection
            title="Paint & Finishing"
            icon={Palette}
            count={property.elevation.paint.length}
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {property.elevation.paint.map((paint, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200  overflow-hidden"
                >
                  <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 border-b">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-100 rounded-lg">
                        <Palette className="w-5 h-5 text-pink-600" />
                      </div>
                      <span className="font-semibold text-gray-900 capitalize">
                        {paint.workType}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sm font-medium text-gray-600 mb-3">
                      Premium Brands:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {paint.brands.map((brand, bIdx) => (
                        <Badge key={bIdx} variant="primary" size="sm">
                          <Star className="w-3 h-3 mr-1" />
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Enhanced Action Section */}
        <div className="  rounded-2xl p-8 text-center text-black">
          <h2 className="text-2xl font-bold mb-2">
            Ready to Build Your Dream Home?
          </h2>
          <p className="text-black-300 mb-6 max-w-2xl mx-auto">
            Get in touch with our experts for detailed consultation and
            personalized quotes for your construction project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <a
              href="tel:+917811831313"
              className="flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200   transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <Phone className="w-5 h-5" />
              +91 7811831313
            </a>

            <button
              onClick={handleShare}
              disabled={shareLoading}
              className="flex items-center justify-center gap-3 bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {shareLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
              {shareLoading ? "Sharing..." : "Share Property"}
            </button>

            <Link
              href="/contact"
              className="flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200   transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <Calculator className="w-5 h-5" />
              Get Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />

      {/* Full Screen Image Modal */}
      {fullScreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={closeFullScreen}
              className="absolute top-4 right-4 z-10 bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors "
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                {fullScreenTitle}
              </h3>
            </div>
            <div className="relative">
              <Image
                src={fullScreenImage}
                alt={fullScreenTitle}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>
            <div className="flex justify-center mt-4 gap-4">
              <button
                onClick={() =>
                  handleDownloadImage(fullScreenImage, fullScreenTitle)
                }
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors "
              >
                <Download className="w-5 h-5" />
                Download Image
              </button>
              <button
                onClick={closeFullScreen}
                className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
