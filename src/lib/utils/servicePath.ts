const SERVICE_PATH_OVERRIDES: Record<string, string> = {
  "tile-grout-cleaning": "/services/tile-and-grout-cleaning",
};

export const getServicePath = (id: string): string =>
  SERVICE_PATH_OVERRIDES[id] ?? `/services/${id}`;
