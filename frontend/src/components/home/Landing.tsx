import { viewType } from "../../types/View";
import { LandingLeft, LandingRight } from "../Landing/Index";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type LandingProps = {
  setView: (view: viewType) => void;
};
export const Landing = ({ setView }: LandingProps) => {
  return (
    <div className="flex w-full flex-col p-4 sm:flex-col md:flex-row">
      <div className="w-full">
        <LandingLeft />
      </div>
      <div className="mx-2 flex w-full items-center justify-center md:w-0">
        <Separator orientation="vertical" className="border-gray-300 mx-10" />
      </div>
      <div className="w-full">
        <LandingRight>
          <Button onClick={() => setView("new")} className="w-full md:w-auto">
            Solicitar Nova Viagem
          </Button>
          <Button onClick={() => setView("list")} variant="success" className="w-full md:w-auto">
            Listar Viagens
          </Button>
        </LandingRight>
      </div>
    </div>
  );
};
