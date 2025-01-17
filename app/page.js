import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home({ children }) {
    return (
        <div className="flex items-center justify-between flex-col h-[100vh]">
            <Navbar />
                {/* Main Content */}
                {children}
            <Footer />
        </div>
    );
}
