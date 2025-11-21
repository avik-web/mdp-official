// "use client";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Icon } from "leaflet";
// import { useEffect, useState } from "react";

// interface Location {
//   id: number;
//   name: string;
//   address: string;
//   coordinates: {
//     lat: number;
//     lng: number;
//   };
//   projects: number;
//   image: string;
// }

// interface MapProps {
//   locations: Location[];
//   onLocationSelect: (location: Location) => void;
//   icon: Icon;
// }

const Map = () => {
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) {
  //   return (
  //     <div className="w-full h-full flex items-center justify-center bg-gray-100">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  return (
    // <MapContainer
    //   center={[23.5204, 87.3119]}
    //   zoom={13}
    //   className="w-full h-full"
    //   style={{ background: "#f5f5f5" }}
    // >
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   {locations.map((location) => (
    //     <Marker
    //       key={location.id}
    //       position={[location.coordinates.lat, location.coordinates.lng]}
    //       icon={icon}
    //       eventHandlers={{
    //         click: () => onLocationSelect(location),
    //       }}
    //     >
    //       <Popup>
    //         <div className="p-2">
    //           <h3 className="font-semibold">{location.name}</h3>
    //           <p className="text-sm text-gray-600">{location.address}</p>
    //           <p className="text-sm text-primary mt-1">
    //             {location.projects} Projects
    //           </p>
    //         </div>
    //       </Popup>
    //     </Marker>
    //   ))}
    // </MapContainer>
    <></>
  );
};

export default Map;
