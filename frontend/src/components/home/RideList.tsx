import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Header } from "../Header";
import { useState } from "react";
import { RideListType } from "../../types/Ride";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useList } from "../../api/Mutations";
import { ClipboardX, TextSearch } from "lucide-react";
import formatUtils from "../../utils/formatUtils";
import { viewType } from "../../types/View";
import { Loader } from "../Loader";

type RideListProps = {
  handleClick: (type: viewType) => void;
};
const INITIAL_FORMDATA = {
  customer_id: "",
  driver_id: "*",
};

export const RideList = ({ handleClick }: RideListProps) => {
  const [tableData, setTableData] = useState<RideListType | null>(null);
  const [formData, setFormData] = useState(INITIAL_FORMDATA);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate } = useList();

  const handleSearch = async () => {
    if (formData.customer_id === "") {
      setErrorMessage("O ID do usuário é obrigatório");
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);
    mutate(formData, {
      onSuccess: (response) => {
        setTableData(response.data);
        setIsLoading(false);
      },
      onError: (error) => {
        setErrorMessage(`${error}`);
        setIsLoading(false);
        setTableData(null);
      },
    });
  };

  return (
    <div className="flex w-full flex-col">
      <Header onBack={() => handleClick("landing")} />

      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-end sm:gap-2">
        <Label className="">
          <span className="mb-1 pl-2 text-xs text-gray-500">Id de usuário</span>
          <Input
            value={formData.customer_id}
            onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
            placeholder="ID do usuário"
            className="w-full sm:w-40"
          />
        </Label>

        <Label className="">
          <span className="mb-1 pl-2 text-xs text-gray-500">Selecione o motorista</span>
          <Select value={formData.driver_id} onValueChange={(e) => setFormData({ ...formData, driver_id: e })}>
            <SelectTrigger className="w-full focus:ring-0 active:ring-0 sm:w-40">
              <SelectValue placeholder="Motorista" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*">Todos</SelectItem>
              <SelectItem value="1">Homer Simpson</SelectItem>
              <SelectItem value="2">Dominic Toretto</SelectItem>
              <SelectItem value="3">James Bond</SelectItem>
            </SelectContent>
          </Select>
        </Label>

        <Button className="w-full sm:w-auto" onClick={handleSearch}>
          Buscar
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center space-y-10 p-2">
        {tableData && !isLoading && (
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Motorista</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead className="text-right">Distância</TableHead>
                <TableHead className="text-right">Duração</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.rides.map((ride) => (
                <TableRow key={ride.id} className="text-xs">
                  <TableCell>{formatUtils.formatDate(ride.date)}</TableCell>
                  <TableCell>{ride.driver.name}</TableCell>
                  <TableCell>{formatUtils.capitalize(ride.origin)}</TableCell>
                  <TableCell>{formatUtils.capitalize(ride.destination)}</TableCell>
                  <TableCell className="text-right">{formatUtils.formatDistance(ride.distance)}</TableCell>
                  <TableCell className="text-right">{formatUtils.formatDuration(ride.duration)}</TableCell>
                  <TableCell className="text-right">{formatUtils.formatValue(ride.value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="p-10">
          {errorMessage && (
            <div className="flex flex-col items-center justify-center gap-4">
              <ClipboardX size={100} absoluteStrokeWidth className="text-slate-300/60" />
              <p className="font-bold text-slate-500">{errorMessage}</p>
            </div>
          )}
          {isLoading && <Loader />}

          {!tableData && !errorMessage && (
            <div className="flex flex-col items-center justify-center gap-4">
              <TextSearch size={100} absoluteStrokeWidth className="text-slate-300/60" />
              <p>Busque por uma viagem!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
