
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { parkingSlotOrderApi } from "@/services/parkingSlotOrderApi";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Trash2 } from "lucide-react";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import CreateParkingSlotOrderDialog from "@/components/parkingSlotOrders/CreateParkingSlotOrderDialog";
import ParkingSlotOrderDetailsDialog from "@/components/parkingSlotOrders/ParkingSlotOrderDetailsDialog";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

const ParkingSlotOrders: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Fetch parking slot orders data with pagination
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['parkingSlotOrders', page, limit],
    queryFn: () => parkingSlotOrderApi.getParkingSlotOrders(page, limit),
  });
  
  const handleCreateOrder = () => {
    setIsCreateDialogOpen(true);
  };
  
  const handleViewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsDialogOpen(true);
  };
  
  const handleDeleteOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (selectedOrder) {
      await parkingSlotOrderApi.deleteParkingSlotOrder(selectedOrder.id);
      refetch();
    }
    setIsDeleteDialogOpen(false);
  };
  
  // Handle successful order creation
  const handleOrderCreated = () => {
    refetch();
  };
  
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
  
  const totalPages = data?.total ? Math.ceil(data.total / limit) : 0;
  
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-parking-accent">Parking Slot Orders</h1>
        <Button 
          onClick={handleCreateOrder}
          className="bg-parking-primary hover:bg-parking-secondary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Book Parking
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-10 w-10 border-4 border-parking-primary border-t-transparent rounded-full"></div>
        </div>
      ) : isError ? (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          Error loading parking orders. Please try again.
        </div>
      ) : (
        <>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Slot Number</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Price/Hour</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data && data.data.length > 0 ? (
                  data.data.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                      <TableCell>{order.parkingSlot?.parkingSlotNumber || '-'}</TableCell>
                      <TableCell>{order.parkingSlotVehicle?.vehiclePlateNumber || '-'}</TableCell>
                      <TableCell>${order.pricePerHour?.toFixed(2)}</TableCell>
                      <TableCell>{order.hours}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={getStatusBadgeColor(order.parkingSlotOrderStatus)}
                        >
                          {order.parkingSlotOrderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDeleteOrder(order)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No parking orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                    className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Logic to display pages around the current page
                  let pageNum = page;
                  if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  if (pageNum <= totalPages) {
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={pageNum === page}
                          onClick={() => setPage(pageNum)}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage(page < totalPages ? page + 1 : page)}
                    className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
      
      {/* Create Order Dialog */}
      <CreateParkingSlotOrderDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleOrderCreated}
      />
      
      {/* Order Details Dialog */}
      <ParkingSlotOrderDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        order={selectedOrder}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Cancel Parking Order"
        description="Are you sure you want to cancel this parking order? This action cannot be undone."
      />
    </div>
  );
};

export default ParkingSlotOrders;
