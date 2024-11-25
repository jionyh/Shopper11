import { CircleArrowRight } from "lucide-react";
import driver from "../../assets/driver.svg";

export const LandingLeft = () => {
  return (
    <div className="relative flex w-full flex-col">
      <div
        className="invisible absolute left-0 top-0 z-10 h-40 w-full bg-cover bg-no-repeat sm:visible sm:mt-12"
        style={{ backgroundImage: `url(${driver})` }}
      ></div>
      <div className="relative p-8 sm:mt-40">
        <h1 className="mb-6 text-center text-4xl font-bold leading-tight text-blue-600">
          Seu destino em poucos cliques
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <CircleArrowRight
              strokeWidth={1}
              absoluteStrokeWidth
              className="h-8 w-8 text-blue-500"
            />
            <p className="text-lg text-gray-700">
              Informe o trajeto da origem e do destino.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <CircleArrowRight
              strokeWidth={1}
              absoluteStrokeWidth
              className="h-8 w-8 text-blue-500"
            />
            <p className="text-lg text-gray-700">
              Escolha o motorista ideal para sua viagem.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <CircleArrowRight
              strokeWidth={1}
              absoluteStrokeWidth
              className="h-8 w-8 text-blue-500"
            />
            <p className="text-lg text-gray-700">
              Aproveite a viagem com praticidade e conforto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
