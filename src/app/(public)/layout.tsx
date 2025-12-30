import Footer from "@/components/global/Footer";
import PublicNavbar from "@/components/navbar/PublicNavbar";
import PublicClientProvider from "../PublicClientProvider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicClientProvider>
      <div className="flex flex-col min-h-screen">
        <PublicNavbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </PublicClientProvider>
  );
}
