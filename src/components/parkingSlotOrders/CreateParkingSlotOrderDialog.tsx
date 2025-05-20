
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { parkingSlotOrderApi } from "@/services/parkingSlotOrderApi";

// Form schema for validation
const orderFormSchema = z.object({
  parkingSlotId: z.string().min(1, {
    message: "Parking slot ID is required.",
  }),
  vehiclePlateNumber: z.string().min(1, {
    message: "Vehicle plate number is required.",
  }),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

interface CreateParkingSlotOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const CreateParkingSlotOrderDialog: React.FC<CreateParkingSlotOrderDialogProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      parkingSlotId: "",
      vehiclePlateNumber: "",
    },
  });

  const onSubmit = async (values: OrderFormValues) => {
    try {
      setIsSubmitting(true);
      await parkingSlotOrderApi.createParkingSlotOrder(values);
      onClose();
      onSave();
    } catch (error) {
      console.error("Error creating parking order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Parking Slot</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new parking reservation.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="parkingSlotId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parking Slot ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter parking slot ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehiclePlateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Plate Number</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Book Parking"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateParkingSlotOrderDialog;
