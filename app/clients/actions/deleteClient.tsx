import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
const hostAddress = process.env.NEXT_PUBLIC_HOST_ADDRESS || "";
import { useAuth } from "@clerk/nextjs";
import { useContext } from "react";
import DataContext from "../dataContext";

interface DeleteClientAlertProps {
  open: boolean;
  onClose: () => void;
  id: string;
}

const deleteClientById = async (id: string, token: string) => {
  const response = await fetch(`${hostAddress}/clients/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);

  if (!response.ok) {
    throw new Error("An error occurred while deleting the client.");
  }
};

export function DeleteClientAlert({
  open,
  onClose,
  id,
}: DeleteClientAlertProps) {
  const { getToken } = useAuth();
  const { mutate } = useContext(DataContext);

  const handleDelete = async () => {
    try {
      const token = await getToken();
      await deleteClientById(id, token);
      mutate();
      onClose(); // Close the alert dialog on successful deletion
    } catch (error) {
      console.error("Failed to delete client:", error);
      // Handle the error appropriately
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete NAME?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            client and any orders associated with them.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
