import { DriverCard } from "../Driver/Index";
import { Skeleton } from "../ui/skeleton";
import { useRouteMap } from "../../api/Queries";
import { Step2Type } from "../../types/Step2";
import { Step1Data } from "../../types/Step1";
import { Driver } from "../../types/Driver";

type Step2Props = {
  handleStep2: (step2Data: Step2Type) => void;
  data: Step1Data;
};
export const Step2 = ({ data, handleStep2 }: Step2Props) => {
  const {
    data: mapData,
    isLoading,
    isFetching,
  } = useRouteMap(data.origin, data.destination);

  const handleStep2Button = (driver: Driver) => {
    const step2Data: Step2Type = {
      customer_id: data.customer_id,
      origin: data.address.origin,
      destination: data.address.destination,
      distance: data.distance,
      duration: data.duration,
      driver: {
        id: driver.id,
        name: driver.name,
      },
      value: driver.value,
    };
    handleStep2(step2Data);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-2 sm:flex-row sm:gap-8">
      {isLoading || isFetching ? (
        <Skeleton className="h-[250px] w-[250px] rounded-lg sm:h-[300px] sm:w-[300px]" />
      ) : (
        mapData &&
        mapData.data.image && (
          <img
            src={`data:image/png;base64,${mapData.data.image}`}
            alt="Mapa da rota"
            className="h-[250px] w-[250px] rounded-lg sm:h-[300px] sm:w-[300px]"
          />
        )
      )}

      <div className="w-full">
        <DriverCard dataStep1={data} handleSelectedDriver={handleStep2Button} />
      </div>
    </div>
  );
};
