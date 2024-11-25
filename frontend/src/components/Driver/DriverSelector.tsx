import { Driver } from "../../types/Driver";
import { Rating } from "../Driver/Index";

type DriverSelectorProps = {
  drivers: Driver[];
  selectedDriver: Driver;
  onSelect: (driver: Driver) => void;
};

export const DriverSelector = ({
  drivers,
  selectedDriver,
  onSelect,
}: DriverSelectorProps) => {
  return (
    <div className="mb-6 flex w-full flex-wrap justify-evenly gap-4">
      {drivers.map((driver) => (
        <button
          key={driver.id}
          onClick={() => onSelect(driver)}
          className={`flex h-20 w-20 transform flex-col items-center justify-evenly rounded-lg p-2 transition duration-200 ease-in-out sm:h-24 sm:w-24 ${
            selectedDriver === driver
              ? "scale-105 bg-primary text-primary-foreground shadow-lg"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span className="text-xs font-semibold sm:text-sm">
            {driver.name}
          </span>
          <Rating rating={driver.review.rating} />
        </button>
      ))}
    </div>
  );
};
