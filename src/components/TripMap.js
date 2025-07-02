import React, { useRef, useMemo, useEffect, useState } from 'react';

const TripMap = ({ articles = [], className = 'h-96' }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Group articles by trip
  const trips = useMemo(() => {
    const tripMap = new Map();
    
    articles.forEach(article => {
      if (!article?.location?.latitude || !article?.location?.longitude || !article?.tripReference) return;
      
      const tripId = article.tripReference.id;
      if (!tripMap.has(tripId)) {
        tripMap.set(tripId, {
          id: tripId,
          color: article.tripReference.color?.hex || '#4F46E5',
          title: article.tripReference.title,
          articles: []
        });
      }
      tripMap.get(tripId).articles.push(article);
    });
    
    // Sort articles within each trip by date
    tripMap.forEach(trip => {
      trip.articles.sort((a, b) => new Date(a.publicationDate) - new Date(b.publicationDate));
    });
    
    return Array.from(tripMap.values());
  }, [articles]);
  
  // Get all articles with location for the map
  const articlesWithLocation = useMemo(
    () => articles.filter(article => article?.location?.latitude && article?.location?.longitude),
    [articles]
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
        
        // Create a custom icon
        if (typeof window !== 'undefined') {
          delete L.Icon.Default.prototype._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjAgNTEyIj48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTYwIDBDOTguMDIgMCA0OCA1MC4xNCA0OCAxMTJjMCA3MC43IDkzLjI3IDEyOC4zNiAxMDEuMDMgMTMzLjE4YzEuOTQgMS4yMiA0LjE2IDEuODIgNi4zOCAxLjgyYzIuMjIgMCA0LjQ0LS42IDYuMzgtMS44MkMxNzguNzMgMjQwLjM2IDI3MiAxODIuNyAyNzIgMTEyQzI3MiA1MC4xNCAyMjEuOTggMCAxNjAgMFoiLz48cGF0aCBmaWxsPSIjMDA3M0YyIiBkPSJNMTYwIDBDMjIxLjk4IDAgMjcyIDUwLjE0IDI3MiAxMTJjMCA3MC43LTkzLjI3IDEyOC4zNi0xMDEuMDMgMTMzLjE4Yy0xLjk0IDEuMjItNC4xNiAxLjgyLTYuMzggMS44MmMtMi4yMiAwLTQuNDQtLjYtNi4zOC0xLjgyQzE0OS4yNyAyNDAuMzYgNTYgMTgyLjcgNTYgMTEyQzU2IDUwLjE0IDEwNi4wMiAwIDE2MCAwek0xNjAgMTYwYzI2LjUxIDAgNDgtMjEuNDkgNDgtNDhzLTIxLjQ5LTQ4LTQ4LTQ4cy00OCAyMS40OS00OCA0OFMxMzMuNSAxNjAgMTYwIDE2MHoiLz48L3N2Zz4=',
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjAgNTEyIj48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTYwIDBDOTguMDIgMCA0OCA1MC4xNCA0OCAxMTJjMCA3MC43IDkzLjI3IDEyOC4zNiAxMDEuMDMgMTMzLjE4YzEuOTQgMS4yMiA0LjE2IDEuODIgNi4zOCAxLjgyYzIuMjIgMCA0LjQ0LS42IDYuMzgtMS44MkMxNzguNzMgMjQwLjM2IDI3MiAxODIuNyAyNzIgMTEyQzI3MiA1MC4xNCAyMjEuOTggMCAxNjAgMFoiLz48cGF0aCBmaWxsPSIjMDA3M0YyIiBkPSJNMTYwIDBDMjIxLjk4IDAgMjcyIDUwLjE0IDI3MiAxMTJjMCA3MC43LTkzLjI3IDEyOC4zNi0xMDEuMDMgMTMzLjE4Yy0xLjk0IDEuMjItNC4xNiAxLjgyLTYuMzggMS44MmMtMi4yMiAwLTQuNDQtLjYtNi4zOC0xLjgyQzE0OS4yNyAyNDAuMzYgNTYgMTgyLjcgNTYgMTEyQzU2IDUwLjE0IDEwNi4wMiAwIDE2MCAwek0xNjAgMTYwYzI2LjUxIDAgNDgtMjEuNDkgNDgtNDhzLTIxLjQ5LTQ4LTQ4LTQ4cy00OCAyMS40OS00OCA0OFMxMzMuNSAxNjAgMTYwIDE2MHoiLz48L3N2Zz4=',
            shadowUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNzUgNDAwIj48ZmlsdGVyIGlkPSJkcm9wLXNoYWRvdyIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PEZlR2F1c2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI1Ii8+PC9maWx0ZXI+PHBhdGggZmlsdGVyPSJ1cmwoI2Ryb3Atc2hhZG93KSIgZmlsbD0icmdiYSgwLDAsMCwwLjMpIiBkPSJNMTM3LjUgMjAwYzAtMzcuOSAzMC43LTY4LjYgNjguNS02OC42czY4LjUgMzAuNyA2OC41IDY4LjZzLTMwLjcgNjguNS02OC41IDY4LjVzLTY4LjUtMzAuNy02OC41LTY4LjV6Ii8+PC9zdmc+',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
        }

        const mapInstance = L.map(mapRef.current, {
          center,
          zoom: articlesWithLocation.length === 1 ? 13 : 2,
          scrollWheelZoom: true
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
      const markers = [];

      // Process each trip
      trips.forEach(trip => {
        const tripArticles = trip.articles.filter(a => a.location?.latitude && a.location?.longitude);
        if (tripArticles.length === 0) return;

        // Add markers for each article in trip
        tripArticles.forEach((article, index) => {
          const position = [article.location.latitude, article.location.longitude];
          bounds.extend(position);
          
          // Create a custom icon with the trip color
          const customIcon = L.divIcon({
            html: `
              <div style="
                background: ${trip.color};
                width: 24px;
                height: 24px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 0 8px rgba(0,0,0,0.2);
              ">
                <div style="
                  transform: rotate(45deg);
                  color: white;
                  font-weight: bold;
                  font-size: 12px;
                  text-align: center;
                  line-height: 1;
                  padding-top: 2px;
                ">
                  ${index + 1}
                </div>
              </div>
            `,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24]
          });

          const marker = L.marker(position, { icon: customIcon }).addTo(map);
          markers.push(marker);
          
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
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                  <div style="
                    width: 12px;
                    height: 12px;
                    background: ${trip.color};
                    border-radius: 50%;
                    margin-right: 6px;
                    flex-shrink: 0;
                  "></div>
                  <h4 style="font-weight: 600; font-size: 14px; margin: 0;">${article.title}</h4>
                </div>
                <p style="font-size: 12px; color: #666; margin: 0 0 8px 18px;">
                  ${new Date(article.publicationDate).toLocaleDateString()}
                </p>
                <a 
                  href="/articles/${article.slug}"
                  style="font-size: 12px; color: #2563eb; text-decoration: none; margin-left: 18px;"
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

        // Add polyline connecting locations in chronological order for this trip
        if (trip.articles.length > 1) {
          const polylinePositions = trip.articles
            .filter(a => a.location?.latitude && a.location?.longitude)
            .map(article => [article.location.latitude, article.location.longitude]);

          if (polylinePositions.length > 1) {
            L.polyline(polylinePositions, {
              color: trip.color,
              weight: 3,
              opacity: 0.8,
              lineJoin: 'round',
              dashArray: '5, 5',
              dashOffset: '10'
            }).addTo(map);
          }
        }
      });

      // Fit map to bounds if there are locations
      if (markers.length > 0) {
        map.fitBounds(bounds, { 
          padding: [50, 50],
          maxZoom: 12 // Prevent too much zoom for single locations
        });
      }

      // Add a small zoom out if there's only one location
      if (markers.length === 1) {
        map.setZoom(10);
      }
    };

    setupMapContent();
  }, [map, isClient, articlesWithLocation]);

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
    <div className={`${className} rounded-lg overflow-hidden z-0 relative`}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default TripMap;