import NavbarComponent from "@/components/layout/NavbarLayout";
import FooterComponent from "@/components/layout/FooterLayout";

export default function HomeLayout({ children }) {
  return (
    <div className="h-screen flex flex-col justify-between">
        <NavbarComponent />

        <div className="flex-1">{children}</div>

        <FooterComponent />
    </div>
  );
}
