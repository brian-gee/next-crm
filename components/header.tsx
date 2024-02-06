import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  const navItems = [
    { text: "Home", href: "/" },
    { text: "Dashboard", href: "/dashboard" },
    { text: "Clients", href: "/clients" },
    { text: "Orders", href: "/orders" },
  ];
  return (
    <main>
      <header className="px-3 py-10 sm:px-6">
        <div className="flex items-center justify-between max-w-3xl mx-auto lg:max-w-6xl">
          <div>
            <a
              href="/"
              aria-label="Flavia's Sweets"
              title="Flavia's Sweets"
              className="inline-flex items-center"
            >
              <span className="ml-2 text-3xl font-bold tracking-wide hover:text-primary">
                Flavia's Sweets
              </span>
            </a>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <ul className="flex space-x-4 text-lg font-bold">
              {navItems.map((item) => (
                <li key={item.text}>
                  {" "}
                  <a href={item.href} className="hover:text-primary">
                    {item.text}
                  </a>
                </li>
              ))}
              <li>
                <UserButton afterSignOutUrl="/" />
              </li>
              <ModeToggle></ModeToggle>
            </ul>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobileMenu"
          className="fixed top-0 left-0 z-10 hidden h-full w-full bg-white bg-opacity-90 backdrop-blur-sm sm:hidden"
        >
          <ul className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <li key={item.text}>
                {" "}
                <a
                  href={item.href}
                  className="text-5xl font-bold hover:text-primary"
                >
                  {item.text}
                </a>
              </li>
            ))}
            <li>
              <UserButton afterSignOutUrl="/" />
            </li>
            <ModeToggle></ModeToggle>
          </ul>
        </div>
      </header>
    </main>
  );
}
