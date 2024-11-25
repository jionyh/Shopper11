import { Driver } from "../../types/Driver";
import { Step1Data } from "../../types/Step1";
import formatUtils from "../../utils/formatUtils";
import { Separator } from "../ui/separator";

type DriverDetailsProps = { driver: Driver; dataStep1: Step1Data };
export const DriverDetails = ({ driver, dataStep1 }: DriverDetailsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {/* Esquerda */}
      <div className="flex flex-col">
        <div className="flex min-h-36 flex-col justify-center text-left font-semibold">
          <h3 className="mb-2 text-2xl font-semibold">{driver.name}</h3>
          <p>
            <span className="text-xl text-primary sm:text-2xl">
              {formatUtils.formatValue(driver.value)}
            </span>
          </p>
        </div>
        <Separator />
        <p className="mt-2 pr-2 text-sm text-gray-600">{driver.description}</p>
      </div>

      {/* Direita */}
      <div className="flex flex-1 flex-col justify-evenly">
        <div className="flex min-h-36 flex-col justify-evenly space-y-2">
          <p className="pr-2 text-xs sm:text-xs">
            <span className="font-bold">Veículo:</span> {driver.vehicle}
          </p>
          <p className="pr-2 text-xs sm:text-xs">
            <span className="font-bold">Comentário:</span>{" "}
            {driver.review.comment}
          </p>
        </div>
        <Separator />
        <div className="mt-2 flex flex-col pl-2 text-xs">
          <h4 className="mb-1 text-center font-semibold">Detalhes da Viagem</h4>
          <p>
            <span className="font-bold">Origem:</span>{" "}
            {formatUtils.capitalize(dataStep1.address.origin)}
          </p>
          <p>
            <span className="font-bold">Destino:</span>{" "}
            {formatUtils.capitalize(dataStep1.address.destination)}
          </p>
          <p>
            <span className="font-bold">Distância:</span>{" "}
            {formatUtils.formatDistance(dataStep1.distance)}
          </p>
          <p>
            <span className="font-bold">Duração:</span>{" "}
            {formatUtils.formatDuration(dataStep1.duration)}
          </p>
        </div>
      </div>
    </div>
  );
};
