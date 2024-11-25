import { useEffect, useState } from "react";
import step1 from "../../assets/step1.svg";
import step2 from "../../assets/step2.svg";
import step3 from "../../assets/step3.svg";

type LandingRightProps = {
  children: React.ReactNode;
};

export const LandingRight = ({ children }: LandingRightProps) => {
  const [step, setStep] = useState(0);
  const steps = [
    {
      svg: step1,
      text: "Pesquise",
    },
    {
      svg: step2,
      text: "Escolha",
    },
    {
      svg: step3,
      text: "Confirme",
    },
  ];

  useEffect(() => {
    if (step <= 3) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, 3000);

      return () => clearTimeout(timer);
    }
    setStep(1);
  }, [step]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-8 p-6">
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Veja como é fácil solicitar sua viagem!
      </h2>
      <p className="text-center text-gray-600">
        Basta seguir os passos abaixo para chegar ao seu destino de forma
        prática e confortável.
      </p>

      <div className="mt-4 flex w-full items-center justify-evenly">
        {steps.map((stepItem, i) => (
          <div
            key={i}
            className={`flex flex-col items-center space-y-2 p-4 ${step === i + 1 ? "rounded-md border border-blue-500 opacity-100" : "opacity-50"}`}
          >
            <img
              src={stepItem.svg}
              alt={`Passo ${i + 1}`}
              className="h-32 w-32"
            />
            <span className="text-center text-sm font-medium text-gray-700">
              {stepItem.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex w-full items-center justify-center gap-2 sm:justify-end">
        {children}
      </div>
    </div>
  );
};
