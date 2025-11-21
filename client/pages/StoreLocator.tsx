import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Phone, Clock, Navigation } from "lucide-react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { LeafletStyles } from "@/components/LeafletMap";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: string;
  distance: string;
  lat: number;
  lng: number;
  hasPickup: boolean;
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

export default function StoreLocator() {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    40.7128, -74.006,
  ]);

  const stores: Store[] = [
    {
      id: "1",
      name: "Downtown Store",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "(212) 555-0123",
      hours: "Mon-Sat: 9AM-9PM, Sun: 10AM-8PM",
      distance: "0.5 mi",
      lat: 40.7128,
      lng: -74.006,
      hasPickup: true,
    },
    {
      id: "2",
      name: "Uptown Store",
      address: "456 Broadway Ave",
      city: "New York",
      state: "NY",
      zipCode: "10023",
      phone: "(212) 555-0456",
      hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-7PM",
      distance: "2.3 mi",
      lat: 40.7614,
      lng: -73.9776,
      hasPickup: true,
    },
    {
      id: "3",
      name: "Brooklyn Store",
      address: "789 Bedford Ave",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11211",
      phone: "(718) 555-0789",
      hours: "Mon-Sun: 10AM-9PM",
      distance: "3.8 mi",
      lat: 40.7081,
      lng: -73.9571,
      hasPickup: false,
    },
  ];

  const handleStoreClick = (store: Store) => {
    setSelectedStore(store);
    setMapCenter([store.lat, store.lng]);
  };

  const handleGetDirections = (store: Store) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <LeafletStyles />
      <div className="px-6 pt-14 pb-4 border-b border-gray-border flex items-center gap-4">
        <button
          onClick={() => navigate("/profile")}
          className="w-10 h-10 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 stroke-gray-dark" strokeWidth={2} />
        </button>
        <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
          Store Locator
        </h2>
      </div>

      <div className="h-[300px] relative">
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={mapCenter} />
          {stores.map((store) => (
            <Marker
              key={store.id}
              position={[store.lat, store.lng]}
              eventHandlers={{
                click: () => handleStoreClick(store),
              }}
            >
              <Popup>
                <div className="p-2">
                  <p className="font-semibold text-sm mb-1">{store.name}</p>
                  <p className="text-xs text-gray-600">{store.address}</p>
                  <p className="text-xs text-gray-600">
                    {store.city}, {store.state} {store.zipCode}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="px-6 pt-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
            Nearby Stores
          </h3>
          <p className="text-gray-medium text-sm tracking-[-0.15px]">
            {stores.length} stores found
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {stores.map((store) => (
            <div
              key={store.id}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedStore?.id === store.id
                  ? "border-brand-pink bg-brand-pink-light"
                  : "border-gray-border bg-white hover:border-gray-300"
              }`}
              onClick={() => handleStoreClick(store)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                      {store.name}
                    </h4>
                    {store.hasPickup && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        BOPIS
                      </span>
                    )}
                  </div>
                  <p className="text-[#6A7282] text-sm tracking-[-0.15px]">
                    {store.address}
                  </p>
                  <p className="text-[#6A7282] text-sm tracking-[-0.15px]">
                    {store.city}, {store.state} {store.zipCode}
                  </p>
                </div>
                <div className="text-brand-pink text-sm font-normal tracking-[-0.15px] ml-4">
                  {store.distance}
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-3 pb-3 border-b border-gray-border">
                <div className="flex items-center gap-2 text-gray-medium text-sm">
                  <Phone className="w-4 h-4" strokeWidth={2} />
                  <a
                    href={`tel:${store.phone}`}
                    className="hover:text-brand-pink"
                  >
                    {store.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-medium text-sm">
                  <Clock className="w-4 h-4" strokeWidth={2} />
                  <span>{store.hours}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetDirections(store);
                  }}
                  className="flex-1 py-2.5 bg-brand-pink text-white rounded-full text-sm font-normal tracking-[-0.15px] flex items-center justify-center gap-2 hover:bg-brand-pink/90 active:scale-95 transition-all"
                >
                  <Navigation className="w-4 h-4" strokeWidth={2} />
                  Get Directions
                </button>
                {store.hasPickup && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/shop");
                    }}
                    className="flex-1 py-2.5 bg-white border border-brand-pink text-brand-pink rounded-full text-sm font-normal tracking-[-0.15px] hover:bg-brand-pink-light active:scale-95 transition-all"
                  >
                    Shop for Pickup
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
