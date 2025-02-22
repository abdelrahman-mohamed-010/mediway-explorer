import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

interface Location {
  lat: number;
  lng: number;
}

interface Doctor {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance: number;
  type: string;
}

const NearbyDoctors = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const { toast } = useToast();
  const [locationError, setLocationError] = useState<string>("");
  const [isLocating, setIsLocating] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
    language: "ar",
    region: "EG",
  });

  const defaultLocation = {
    lat: 30.0444, // Cairo, Egypt coordinates
    lng: 31.2357,
  };

  const fetchNearbyDoctors = async (lat: number, lng: number) => {
    try {
      setIsLoading(true);
      const query = `
        [out:json][timeout:25];
        (
          // Hospitals and clinics
          way["amenity"="hospital"](around:10000,${lat},${lng});
          way["amenity"="clinic"](around:10000,${lat},${lng});
          node["amenity"="hospital"](around:10000,${lat},${lng});
          node["amenity"="clinic"](around:10000,${lat},${lng});
          
          // Doctors and medical centers
          node["healthcare"="doctor"](around:10000,${lat},${lng});
          node["healthcare"="centre"](around:10000,${lat},${lng});
          way["healthcare"="centre"](around:10000,${lat},${lng});
          
          // Specific doctor specialties
          node["healthcare:speciality"="gastroenterologist"](around:10000,${lat},${lng});
          node["healthcare:speciality"="internal"](around:10000,${lat},${lng});
          
          // Medical specialty centers
          way["name"~"."](around:10000,${lat},${lng})["name:ar"~"كبد|باطنة|مستشفى|عيادة|طبيب",i];
          node["name"~"."](around:10000,${lat},${lng})["name:ar"~"كبد|باطنة|مستشفى|عيادة|طبيب",i];
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      const data = await response.json();

      const doctors: Doctor[] = data.elements
        .filter(
          (item: any) => item.tags && (item.tags.name || item.tags["name:ar"])
        )
        .map((item: any) => ({
          id: item.id.toString(),
          name: item.tags["name:ar"] || item.tags.name, // Prefer Arabic name if available
          address: item.tags["addr:street"]
            ? `${item.tags["addr:street"]} ${
                item.tags["addr:housenumber"] || ""
              }`
            : "Address not available",
          lat: item.lat || item.center?.lat,
          lng: item.lon || item.center?.lon,
          distance: calculateDistance(
            lat,
            lng,
            item.lat || item.center?.lat,
            item.lon || item.center?.lon
          ),
          type: getLocationType(item.tags),
        }))
        .filter((doctor: Doctor) => doctor.lat && doctor.lng); // Filter out invalid coordinates

      setDoctors(doctors);

      if (doctors.length === 0) {
        toast({
          title: "No Results",
          description:
            "No medical facilities found. Try increasing search radius.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to fetch nearby facilities",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getLocationType = (tags: any) => {
    if (tags["healthcare:speciality"]) {
      return `طبيب ${tags["healthcare:speciality"]}`;
    }
    if (tags.amenity === "hospital") {
      return "مستشفى";
    }
    if (tags.amenity === "clinic") {
      return "عيادة";
    }
    if (tags.healthcare === "doctor") {
      return "طبيب";
    }
    return tags.amenity || tags.healthcare || "مركز طبي";
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000;
  };

  const requestLocation = useCallback(() => {
    setIsLocating(true);
    setLocationError("");

    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // Increased timeout to 10 seconds
      maximumAge: 0,
    };

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      console.log("Got location:", latitude, longitude); // Debug log
      setUserLocation({ lat: latitude, lng: longitude });
      fetchNearbyDoctors(latitude, longitude);
      setIsLocating(false);
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error("Location error:", error); // Debug log
      setLocationError(error.message);
      setUserLocation(defaultLocation);
      fetchNearbyDoctors(defaultLocation.lat, defaultLocation.lng);
      setIsLocating(false);
      toast({
        title: "Location Error",
        description: error.message,
        variant: "destructive",
      });
    };

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setUserLocation(defaultLocation);
      fetchNearbyDoctors(defaultLocation.lat, defaultLocation.lng);
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">خطأ</h2>
        <p className="text-red-500">
          مفتاح API غير موجود. يرجى إضافة VITE_GOOGLE_MAPS_API_KEY في ملف .env
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Error</h2>
        <p className="text-red-500">
          Failed to load Google Maps. Please check your API key and try again.
        </p>
      </div>
    );
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Nearby Medical Facilities
        </h2>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Nearby Medical Facilities</h2>
          <button
            onClick={requestLocation}
            disabled={isLocating}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLocating ? "Getting Location..." : "Update Location"}
          </button>
        </div>

        {locationError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {locationError}
          </div>
        )}

        <div
          style={{ height: "70vh", borderRadius: "0.5rem", overflow: "hidden" }}
        >
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={userLocation || { lat: 0, lng: 0 }}
            zoom={13}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              streetViewControl: true,
            }}
          >
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />
            )}

            {doctors.map((doctor) => (
              <Marker
                key={doctor.id}
                position={{ lat: doctor.lat, lng: doctor.lng }}
                onClick={() => setSelectedDoctor(doctor)}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                }}
              />
            ))}

            {selectedDoctor && (
              <InfoWindow
                position={{ lat: selectedDoctor.lat, lng: selectedDoctor.lng }}
                onCloseClick={() => setSelectedDoctor(null)}
              >
                <div className="p-2 max-w-xs">
                  <h3 className="font-bold text-lg">{selectedDoctor.name}</h3>
                  <p className="text-sm mt-1">{selectedDoctor.address}</p>
                  <p className="text-sm text-blue-600">
                    Distance: {(selectedDoctor.distance / 1000).toFixed(1)} km
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedDoctor.type}
                  </p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-4">
            Found {doctors.length} facilities in your area
          </p>
          <div className="grid gap-2">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="text-sm bg-gray-50 p-2 rounded cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedDoctor(doctor)}
              >
                <strong>{doctor.name}</strong>
                <p className="text-xs text-gray-600">{doctor.address}</p>
                <p className="text-xs text-gray-500">
                  {(doctor.distance / 1000).toFixed(1)} km
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyDoctors;
