import Card from "@/components/card";
import ConfettiCard from "@/components/confettiCard";

export default function Home() {
  return (
    <main className="w-full max-w-screen-md p-4 mx-auto text-xl">
      <h1 className="mb-20 text-6xl font-bold text-center">Welcome to CRM</h1>
      <ul role="list" className="grid grid-cols-1 gap-8 p-0 md:grid-cols-2">
        <Card
          href="/dashboard"
          title="Dashboard"
          body="Vist your dashboard to view an overview of your data."
        />
        <Card
          href="/clients"
          title="Clients"
          body="Check out your clients and their related information."
        />
        <Card
          href="/orders"
          title="Orders"
          body="Check out your orders and their related information."
        />
        <ConfettiCard
          href=""
          title="Celebrate"
          body="️Get excited about an amazing way to start tracking your data!"
        />
      </ul>
    </main>
  );
}
