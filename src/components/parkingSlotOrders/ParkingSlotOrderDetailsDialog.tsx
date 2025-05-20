
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParkingSlotOrder } from "@/services/parkingSlotOrderApi";
import { CalendarClock, Car, MapPin, Tag, CreditCard } from "lucide-react";

interface ParkingSlotOrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: ParkingSlotOrder | null;
}

const ParkingSlotOrderDetailsDialog: React.FC<ParkingSlotOrderDetailsDialogProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!order) {
    return null;
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const totalAmount = order.pricePerHour * order.hours;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <span>Parking Order Details</span>
            <Badge 
              variant="outline"
              className={getStatusBadgeColor(order.parkingSlotOrderStatus)}
            >
              {order.parkingSlotOrderStatus}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-medium">{order.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Parking Slot Details */}
            <div className="border rounded-md p-3 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-parking-primary" />
                Parking Information
              </h3>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Slot:</span> {order.parkingSlot?.parkingSlotNumber || 'N/A'}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Size:</span> {order.parkingSlot?.parkingSlotSize || 'N/A'}
                </p>
                {order.parkingSlot?.parking && (
                  <>
                    <p className="text-sm">
                      <span className="font-medium">Category:</span> {order.parkingSlot.parking.slotCategory}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="border rounded-md p-3 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Car className="h-4 w-4 text-parking-primary" />
                Vehicle Information
              </h3>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Plate Number:</span> {order.parkingSlotVehicle?.vehiclePlateNumber || 'N/A'}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Vehicle ID:</span> {order.vehicleId}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="border rounded-md p-3 space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Tag className="h-4 w-4 text-parking-primary" />
              Booking Details
            </h3>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-medium">Price per hour</p>
              </div>
              <p className="text-sm">${order.pricePerHour.toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <CalendarClock className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-medium">Hours booked</p>
              </div>
              <p className="text-sm">{order.hours}</p>
            </div>

            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-medium">
                <p>Total Amount</p>
                <p className="text-parking-accent">${totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ParkingSlotOrderDetailsDialog;
