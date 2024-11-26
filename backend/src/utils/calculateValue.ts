export const calculateValue = (distanceMeters: number, tax: number): number => {
  return tax * (distanceMeters / 1000);
};
