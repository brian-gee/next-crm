import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { payments } from "./data";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center pt-20">
        <h1 className="mb-10 text-6xl font-bold text-center">Clients</h1>
      </div>
      <div className="p-10">
        <DataTable columns={columns} data={payments} />
      </div>
    </main>
  );
}
