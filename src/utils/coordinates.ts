/**
 * Convert geographic coordinates (latitude/longitude) to 3D Cartesian
 * coordinates on the surface of a sphere.
 *
 * @param lat - Latitude in degrees (-90 to 90)
 * @param lng - Longitude in degrees (-180 to 180)
 * @param radius - Sphere radius (default 1.2)
 * @returns [x, y, z] position on sphere surface
 */
export function latLngToPosition(
  lat: number,
  lng: number,
  radius: number = 1.2
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return [x, y, z];
}

/**
 * Convert a 3D point on the globe surface back into latitude/longitude.
 */
export function positionToLatLng(
  x: number,
  y: number,
  z: number
): { latitude: number; longitude: number } {
  const radius = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  const latitude = Math.asin(y / radius) * (180 / Math.PI);
  const theta = Math.atan2(z, -x) * (180 / Math.PI);
  const longitude = normalizeLongitude(theta - 180);

  return { latitude, longitude };
}

/**
 * Great-circle distance in kilometers between two coordinate pairs.
 */
export function haversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(a));
}

function normalizeLongitude(longitude: number): number {
  let normalized = longitude;
  while (normalized <= -180) normalized += 360;
  while (normalized > 180) normalized -= 360;
  return normalized;
}

/**
 * Calculate the normal vector at a point on the sphere surface.
 * For a unit sphere centered at origin, the normal is the normalized position.
 */
export function getSurfaceNormal(
  position: [number, number, number]
): [number, number, number] {
  const length = Math.sqrt(
    position[0] ** 2 + position[1] ** 2 + position[2] ** 2
  );
  return [position[0] / length, position[1] / length, position[2] / length];
}
