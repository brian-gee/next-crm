"use client";

import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";
import { DataTable } from "./data-table";
import { columns } from "./columns";
const hostAddress = process.env.NEXT_PUBLIC_HOST_ADDRESS || "";
import DataContext from "./dataContext";

const useClerkSWR = (url: string) => {
  const { getToken } = useAuth();

  const fetcher = async (url: string) => {
    const token = await getToken();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  };

  return useSWR(url, fetcher);
};

export default function Page() {
  const { data, error, mutate } = useClerkSWR(hostAddress + "/clients");

  if (error) return <div>Failed to load</div>;
  const isLoading = !data && !error;

  return (
    <main>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-6xl font-bold">Clients</h1>
      </div>
      <div className="p-10">
        {isLoading ? (
          <div className="flex justify-center">Loading...</div>
        ) : (
          <DataContext.Provider value={{ mutate }}>
            <DataTable
              columns={columns}
              data={data}
              searchText="Search clients..."
              searchColumn="last_name"
            />
          </DataContext.Provider>
        )}
      </div>
    </main>
  );
}
