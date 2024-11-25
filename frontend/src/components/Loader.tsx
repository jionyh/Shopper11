import { LoaderCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export const Loader = () => {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="border-none bg-transparent shadow-none">
        <AlertDialogHeader>
          <AlertDialogTitle />
          <AlertDialogDescription className="flex items-center justify-center gap-2 text-white">
            <LoaderCircle
              className="h-10 w-10 animate-spin"
              absoluteStrokeWidth
            />
            <span>Processando informações</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
