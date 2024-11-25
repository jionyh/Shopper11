import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Step1Form } from "../../types/Step1";

type Step1Props = {
  handleStep1: (formData: Step1Form) => void;
  error: string | null;
};
export const Step1 = ({ handleStep1, error }: Step1Props) => {
  const [formData, SetFormData] = useState({
    customer_id: "",
    origin: "",
    destination: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleStep1(formData);
  };

  return (
    <div className="flex w-full flex-col space-y-8 py-10 sm:flex-row sm:space-x-10 sm:space-y-0 sm:px-10">
      <div className="flex w-full flex-col justify-start sm:justify-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 sm:text-3xl">
          Solicite sua viagem
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Preencha os detalhes para solicitar uma nova viagem. Insira seu ID de
          usuário, endereço de origem e destino, e clique em "Solicitar" para
          continuar.
        </p>
      </div>

      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <Label className="flex w-full flex-col">
            <span className="mb-1 pl-2 text-xs text-gray-500">
              ID do usuário
            </span>
            <Input
              onChange={(e) =>
                SetFormData({ ...formData, customer_id: e.target.value })
              }
              value={formData.customer_id}
              className="rounded-md border p-2 shadow"
              type="text"
              placeholder="Digite seu ID de usuário"
            />
          </Label>

          <Label className="flex w-full flex-col">
            <span className="mb-1 pl-2 text-xs text-gray-500">
              Endereço de Origem
            </span>
            <Input
              onChange={(e) =>
                SetFormData({ ...formData, origin: e.target.value })
              }
              value={formData.origin}
              className="rounded-md border p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Ex: Rua A, 123 - Cidade"
            />
          </Label>

          <Label className="flex w-full flex-col">
            <span className="mb-1 pl-2 text-xs text-gray-500">
              Endereço de Destino
            </span>
            <Input
              onChange={(e) =>
                SetFormData({ ...formData, destination: e.target.value })
              }
              value={formData.destination}
              className="rounded-md border p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Ex: Rua B, 456 - Cidade"
            />
          </Label>

          {error && (
            <p className="p-2 text-center text-xs text-destructive">{error}</p>
          )}

          <div className="flex w-full items-center justify-end">
            <Button
              type="submit"
              size="default"
              className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600 sm:w-auto"
            >
              Solicitar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
