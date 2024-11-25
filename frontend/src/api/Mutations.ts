import { useMutation } from "@tanstack/react-query";
import { Step1Form } from "../types/Step1";
import { client } from "./Client";
import { Step2Type } from "../types/Step2";

export const useRideEstimate = () => {
  return useMutation({
    mutationFn: (formData: Step1Form) => client.post("/estimate", formData),
  });
};

export const useRideConfirm = () => {
  return useMutation({
    mutationFn: (step2Data: Step2Type) => client.patch("/confirm", step2Data),
  });
};

export const useList = () => {
  return useMutation({
    mutationFn: ({ customer_id, driver_id }: { customer_id: string; driver_id?: string }) =>
      client.get(`/${driver_id !== "*" ? `${customer_id}?driver_id=${driver_id}` : `${customer_id}`}`),
  });
};
