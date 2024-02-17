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
  name: string;
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
  name,
}: DeleteClientAlertProps) {
  const { getToken } = useAuth();
  const { mutate } = useContext(DataContext);

  const handleDelete = async () => {
    try {
      const token = await getToken();
      if (token === null) {
        console.error("Authentication token is not available.");
        return;
      }
      await deleteClientById(id, token);
      mutate();
      onClose();
    } catch (error) {
      console.error("Failed to delete client:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete {name}
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
