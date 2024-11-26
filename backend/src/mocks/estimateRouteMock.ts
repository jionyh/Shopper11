export const mockRoutes = [
  {
    distanceMeters: 10000,
    duration: "1000s",
    legs: [
      {
        startLocation: {
          latLng: {
            latitude: 22.2222,
            longitude: -11.1111,
          },
        },
        endLocation: {
          latLng: {
            latitude: 22.3222,
            longitude: -11.3111,
          },
        },
      },
    ],
  },
];

export const mockEstimateRoute = jest.fn().mockReturnValue({
  routes: mockRoutes,
});
