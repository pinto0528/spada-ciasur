import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import "../../styles/global.css"; // Asegúrate de importar tus estilos globales

export const metadata = {
  title: "SPADA",
  description: "Generated by Next.js",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="layout">
        <Sidebar />
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
