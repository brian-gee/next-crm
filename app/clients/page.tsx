"use client";

import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
const hostAddress = process.env.NEXT_PUBLIC_HOST_ADDRESS;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error, isLoading } = useSWR(hostAddress, fetcher);

  if (error) return <div>Failed to load</div>;

  return (
    <main>
      <div className="flex flex-col items-center justify-center pt-20">
        <h1 className="mb-10 text-6xl font-bold text-center">Clients</h1>
      </div>
      <div className="p-10">
        {isLoading ? (
          <div className="flex justify-center">Loading...</div>
        ) : (
          <DataTable
            columns={columns}
            data={data}
            searchText="Search clients..."
            searchColumn="last_name"
          />
        )}
      </div>
    </main>
  );
}
