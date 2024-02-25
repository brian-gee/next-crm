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
import DataContext from "../../../lib/dataContext";

interface ViewClientAlertProps {
  open: boolean;
  onClose: () => void;
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
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

export function ViewClientAlert({
  open,
  onClose,
  id,
  name,
  email,
  phone,
  address,
  company,
}: ViewClientAlertProps) {
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
          <AlertDialogTitle>{name}</AlertDialogTitle>
          <h1>{email}</h1>
          <h1>{phone}</h1>
          <h1>{address}</h1>
          <h1>{company}</h1>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
