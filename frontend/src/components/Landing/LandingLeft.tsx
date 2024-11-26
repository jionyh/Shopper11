import { CircleArrowRight } from "lucide-react";
import driver from "../../assets/driver.svg";

export const LandingLeft = () => {
  return (
    <div className="relative flex w-full flex-col">
      <div
        className="invisible absolute left-0 top-0  h-52 w-full bg-cover bg-no-repeat rounded-lg sm:visible sm:mt-10"
        style={{ backgroundImage: `url(${driver})` }}
      ></div>
      <div className="relative p-8 z-1 sm:pt-64 bg-white/20">
        <h1 className="mb-14 text-left text-3xl font-bold leading-tight text-blue-600">Seu destino em poucos cliques</h1>
        <div className="flex flex-col items-start space-y-2 sm:space-y-10">
          <div className="flex items-center space-x-3">
            <CircleArrowRight strokeWidth={1} absoluteStrokeWidth className="h-8 w-8 text-blue-500" />
            <p className="text-lg text-gray-700">Informe o trajeto da origem e do destino.</p>
          </div>
          <div className="flex items-center space-x-3">
            <CircleArrowRight strokeWidth={1} absoluteStrokeWidth className="h-8 w-8 text-blue-500" />
            <p className="text-lg text-gray-700">Escolha o motorista ideal para sua viagem.</p>
          </div>
          <div className="flex items-center space-x-3">
            <CircleArrowRight strokeWidth={1} absoluteStrokeWidth className="h-8 w-8 text-blue-500" />
            <p className="text-lg text-gray-700">Aproveite a praticidade e conforto.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
