import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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
import { useAuth } from "@clerk/nextjs";
import DataContext from "../dataContext";
const hostAddress = process.env.NEXT_PUBLIC_HOST_ADDRESS || "";

export function AddClient() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { mutate } = useContext(DataContext);
  const [clientData, setClientData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    company: "",
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = await getToken();

    try {
      await axios.post(`${hostAddress}/clients`, clientData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/sucess#clients");
      setClientData({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        company: "",
      });
      // mutate(); // This will refresh the data
    } catch (error: any) {
      console.error("Error adding client:", error.response.data);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add client</DialogTitle>
          <DialogDescription>
            Add a client to your database. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first_name" className="text-right">
                First Name
              </Label>
              <Input
                type="text"
                id="first_name"
                value={clientData.first_name}
                onChange={handleChange}
                placeholder="Pedro"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last_name" className="text-right">
                Last Name
              </Label>
              <Input
                type="text"
                id="last_name"
                value={clientData.last_name}
                onChange={handleChange}
                placeholder="Duarte"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                type="tel"
                id="phone"
                value={clientData.phone}
                onChange={handleChange}
                placeholder="3059149826"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={clientData.email}
                onChange={handleChange}
                placeholder="pduarte@mail.com"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                type="text"
                id="address"
                value={clientData.address}
                onChange={handleChange}
                placeholder="19501 Biscayne Boulevard"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input
                type="text"
                id="city"
                value={clientData.city}
                onChange={handleChange}
                placeholder="Aventura"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zip" className="text-right">
                Zip
              </Label>
              <Input
                type="text"
                id="zip"
                value={clientData.zip}
                onChange={handleChange}
                placeholder="33180"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                type="text"
                id="company"
                value={clientData.company}
                onChange={handleChange}
                placeholder="Apple Inc."
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save client</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
