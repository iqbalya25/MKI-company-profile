// File: src/components/layout/MainLayout.tsx
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButtonSimple from "../common/WhatsAppButtonSimple";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButtonSimple />
    </div>
  );
};

export default MainLayout;
