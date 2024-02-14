import { DataTable } from "./data-table";
import { columns } from "./columns";
import { payments } from "./data";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">Orders</h1>
      </div>
      <div className="p-10">
        <DataTable
          columns={columns}
          data={payments}
          searchText="Search orders..."
          searchColumn="clientName"
        />
      </div>
    </main>
  );
}
