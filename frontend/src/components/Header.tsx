import { ChevronLeft } from "lucide-react";

type HeaderProps = {
  title?: string;
  onBack: () => void;
};
export const Header = ({ title, onBack }: HeaderProps) => {
  return (
    <div className="flex w-full items-center p-4">
      <div className="flex cursor-pointer items-center p-2" onClick={onBack}>
        <ChevronLeft className={`h-8 w-8 text-blue-500 hover:scale-105`} />
        <p className="font-bold">voltar</p>
      </div>
      <p className="text-xl font-semibold text-gray-800">{title}</p>
    </div>
  );
};
