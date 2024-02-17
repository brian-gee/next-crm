"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteClientAlert } from "./dialogs/deleteClient";

type Client = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  company: string;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("first_name")}</div>
    ),
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("last_name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="lowercase">
        {(row.getValue("phone") as string).replace(
          /(\d{3})(\d{3})(\d{4})/,
          "($1) $2-$3",
        )}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const client = row.original;
      const [deleteAlertIsOpen, setDeleteAlertIsOpen] = React.useState(false);

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(client.email)}
              >
                Copy email
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(client.phone)}
              >
                Copy phone
              </DropdownMenuItem>
              <DropdownMenuItem>View client info</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteAlertIsOpen(true)}>
                Delete client
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteClientAlert
            open={deleteAlertIsOpen}
            onClose={() => setDeleteAlertIsOpen(false)}
            id={client.id}
            name={`${client.first_name} ${client.last_name}`}
          />
        </div>
      );
    },
  },
];
