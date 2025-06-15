import React, { useRef, useMemo, useEffect, useState } from 'react';

const TripMap = ({ articles = [], tripColor = '#4F46E5', className = 'h-96' }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Filter articles with location data
  const articlesWithLocation = useMemo(
    () => articles.filter(article => article?.location?.latitude && article?.location?.longitude),
    [articles]
  );

  // Sort articles by publication date for the polyline
  const sortedArticles = useMemo(() => 
    [...articlesWithLocation].sort((a, b) =>
      new Date(a.publicationDate) - new Date(b.publicationDate)
    ), [articlesWithLocation]
  );

  // Calculate center from articles or use default
  const center = useMemo(() => {
    if (articlesWithLocation.length > 0) {
      return [articlesWithLocation[0].location.latitude, articlesWithLocation[0].location.longitude];
    }
    return [51.505, -0.09]; // Default center
  }, [articlesWithLocation]);

  // Client-side mount detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize map only on client side
  useEffect(() => {
    if (!isClient || !mapRef.current || map) return;

    // Dynamic import of Leaflet to ensure it only loads on client
    const initializeMap = async () => {
      try {
        const L = await import('leaflet');
        
        // Fix for default markers - only run on client
        if (typeof window !== 'undefined') {
          delete L.Icon.Default.prototype._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
        }

        const mapInstance = L.map(mapRef.current, {
          center,
          zoom: articlesWithLocation.length === 1 ? 13 : 2,
          scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(mapInstance);

        setMap(mapInstance);
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    };

    initializeMap();

    // Cleanup function
    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, [isClient, center, articlesWithLocation.length]);

  // Map content effect - runs when map is ready and articles change
  useEffect(() => {
    if (!map || !isClient || articlesWithLocation.length === 0) return;

    const setupMapContent = async () => {
      const L = await import('leaflet');
      
      // Clear existing layers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          map.removeLayer(layer);
        }
      });

      const bounds = L.latLngBounds();

      // Add markers for each article
      articlesWithLocation.forEach((article) => {
        const position = [article.location.latitude, article.location.longitude];
        bounds.extend(position);

        const marker = L.marker(position).addTo(map);
        
        // Create popup content
        const popupContent = `
          <div style="width: 200px;">
            ${article.coverImage?.url ? `
              <img 
                src="${article.coverImage.url}?w=300&h=200&fit=crop&crop=faces,center" 
                alt="${article.coverImage.alt || article.title}"
                style="width: 100%; height: 96px; object-fit: cover; border-radius: 4px 4px 0 0;"
              />
            ` : ''}
            <div style="padding: 8px;">
              <h4 style="font-weight: 600; font-size: 14px; margin: 0 0 4px 0;">${article.title}</h4>
              <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;">
                ${new Date(article.publicationDate).toLocaleDateString()}
              </p>
              <a 
                href="/articles/${article.slug}"
                style="font-size: 12px; color: #2563eb; text-decoration: none;"
                onmouseover="this.style.textDecoration='underline'"
                onmouseout="this.style.textDecoration='none'"
              >
                Read more →
              </a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
      });

      // Add polyline connecting locations in chronological order
      if (sortedArticles.length > 1) {
        const polylinePositions = sortedArticles.map(article => [
          article.location.latitude,
          article.location.longitude
        ]);

        L.polyline(polylinePositions, {
          color: tripColor,
          weight: 2,
          opacity: 0.7
        }).addTo(map);
      }

      // Fit map to bounds if multiple locations
      if (articlesWithLocation.length > 1) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    };

    setupMapContent();
  }, [map, isClient, articlesWithLocation, sortedArticles, tripColor]);

  // Show loading state during SSR or while initializing
  if (!isClient) {
    return (
      <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  // If no articles with location data, show a message
  if (articlesWithLocation.length === 0) {
    return (
      <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <p className="text-gray-500">No location data available for this trip</p>
      </div>
    );
  }

  return (
    <div className={`${className} rounded-lg overflow-hidden`}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default TripMap;