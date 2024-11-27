import { useState } from "react";
import { Step1, Step2, Step3 } from "../Ride/Index";
import { Step1Form, Step1Data } from "../../types/Step1";
import { useRideConfirm, useRideEstimate } from "../../api/Mutations";
import { Header } from "../Header";
import { Loader } from "../Loader";
import { Step2Type } from "../../types/Step2";
import { viewType } from "../../types/View";

type NewRideProps = {
  setView: (type: viewType) => void;
};

export const NewRide = ({ setView }: NewRideProps) => {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate: mutateEstimate } = useRideEstimate();
  const { mutate: mutateConfirm } = useRideConfirm();

  const handleStep1 = async (formData: Step1Form) => {
    setError(null);

    setIsLoading(true);
    mutateEstimate(formData, {
      onSuccess: (data) => {
        setStep1Data({
          ...data.data,
          address: {
            origin: formData.origin,
            destination: formData.destination,
          },
          customer_id: formData.customer_id,
        });
        setStep(2);
        setIsLoading(false);
        setError(null);
      },
      onError: (error) => {
        console.error("Erro na mutação:", error);
        setIsLoading(false);
        setError(`${error}`);
      },
    });
  };

  const handleStep2 = async (step2Data: Step2Type) => {
    setError(null);
    setIsLoading(true);
    mutateConfirm(step2Data, {
      onSuccess: () => {
        setIsLoading(false);
        setStep(3);
        setTimeout(() => {
          setView("list");
        }, 2000);
      },
      onError: (err) => {
        console.error("Erro na mutação:", err);
        setIsLoading(false);
        setError("Ocorreu um erro ao processar sua solicitação.");
      },
    });
  };

  const handleOnBack = () => {
    if (step === 2) {
      setStep(1);
      setStep1Data(null);
      return;
    }
    setView("landing");
  };
  return (
    <div className="w-full">
      {step !== 3 && <Header onBack={handleOnBack} />}
      <div className="flex px-2 sm:px-10">
        {isLoading && <Loader />}
        {step === 1 && <Step1 handleStep1={handleStep1} error={error} />}
        {!isLoading && step1Data && step === 2 && <Step2 data={step1Data} handleStep2={handleStep2} />}
        {step === 3 && <Step3 />}
      </div>
    </div>
  );
};
