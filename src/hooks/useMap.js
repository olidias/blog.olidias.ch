import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';

export function useMap({ ref, center, zoom }) {
  const [map, setMap] = useState();

  useEffect(() => {
    if (!ref.current || map) return;

    const mapInstance = L.map(ref.current, {
      center,
      zoom,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [ref, center, zoom, map]);

  return { map };
}