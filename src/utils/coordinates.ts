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
