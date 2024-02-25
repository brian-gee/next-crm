import * as React from "react";
import { cn } from "@/lib/utils";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@clerk/nextjs";
import DataContext from "../../../lib/dataContext";
const hostAddress = process.env.NEXT_PUBLIC_HOST_ADDRESS || "";

const useClerkSWR = (url: string) => {
  const { getToken } = useAuth();

  const fetcher = async (url: string) => {
    const token = await getToken();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };

  return useSWR(url, fetcher);
};

export function AddOrder() {
  const { data, error } = useClerkSWR(`${hostAddress}/clients`);
  const [open, setOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedClientName, setSelectedClientName] = useState("");
  const router = useRouter();
  const { getToken } = useAuth();
  const { mutate } = useContext(DataContext);
  const [orderData, setOrderData] = useState({
    amount: "",
    status: "pending",
    client_id: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleClientSelect = (clientId, clientName) => {
    setSelectedClientId(clientId);
    setSelectedClientName(clientName); // Update selected client's name
    setOrderData((prevData) => ({
      ...prevData,
      client_id: clientId,
    }));
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();

    try {
      await axios.post(`${hostAddress}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/success#orders");
      setOrderData({
        amount: "",
        status: "pending",
        client_id: "",
        description: "",
      });
      // mutate(); // Optionally refresh the data
    } catch (error) {
      console.error("Error adding order:", error.response.data);
      // Handle error (e.g., show an error message)
    }
  };

  if (error) return <div>Failed to load clients</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Order</DialogTitle>
          <DialogDescription>
            Add an order to your database. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client_id" className="text-right">
                Client Name
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {selectedClientName || "Select client..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search clients..." />
                    {data.length === 0 && (
                      <CommandEmpty>No clients found.</CommandEmpty>
                    )}
                    <CommandGroup>
                      {data.map((client) => (
                        <CommandItem
                          key={client.id}
                          onSelect={() =>
                            handleClientSelect(
                              client.id,
                              `${client.first_name} ${client.last_name}`,
                            )
                          }
                        >
                          <Check
                            className={
                              selectedClientId === client.id
                                ? "mr-2 h-4 w-4 opacity-100"
                                : "mr-2 h-4 w-4 opacity-0"
                            }
                          />
                          {client.first_name} {client.last_name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select defaultValue="pending">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                type="number"
                id="amount"
                value={orderData.amount}
                onChange={handleChange}
                placeholder="150"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                type="text"
                id="description"
                value={orderData.description}
                onChange={handleChange}
                placeholder="Order description..."
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
