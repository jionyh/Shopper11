import confirm from "../../assets/confirm.svg";

export const Step3 = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center py-36 sm:p-16 md:p-40">
      <img
        src={confirm}
        className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40"
        alt="Confirmação concluída"
      />
      <p className="mt-4 text-center text-lg text-gray-600 sm:text-xl md:text-2xl">
        Viagem Confirmada!
      </p>
    </div>
  );
};
