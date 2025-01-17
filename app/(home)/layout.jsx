import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


export default function HomeLayout({ children }) {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
