import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
} 