import ClientProviders from "@/app/ClientProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/global/Footer";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ClientProviders>
  );
}
