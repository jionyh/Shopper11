import { useState } from "react";
import { Step1Data } from "../../types/Step1";
import { Button } from "../ui/button";
import { DriverSelector, DriverDetails } from "../Driver/Index";
import { Driver } from "../../types/Driver";

type DriverCardProps = {
  dataStep1: Step1Data;
  handleSelectedDriver: (data: Driver) => void;
};

export const DriverCard = ({ dataStep1, handleSelectedDriver }: DriverCardProps) => {
  const [selectedDriver, setSelectedDriver] = useState(dataStep1.options[0] || null);
  const drivers = dataStep1.options;

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-between px-2 pb-10">
      <h1 className="mb-4 text-center text-2xl font-semibold sm:text-xl">Motoristas Disponíveis</h1>

      <DriverSelector drivers={drivers} onSelect={handleDriverSelect} selectedDriver={selectedDriver} />

      <div className="w-full flex-1">
        {selectedDriver ? (
          <DriverDetails dataStep1={dataStep1} driver={selectedDriver} />
        ) : (
          <p className="text-center text-gray-500">Selecione um motorista para ver os detalhes.</p>
        )}
      </div>

      <div className="w-full sm:px-10 pt-4 sm:pt-0">
        <Button onClick={() => handleSelectedDriver(selectedDriver)} className="w-full">
          Solicitar viagem
        </Button>
      </div>
    </div>
  );
};
