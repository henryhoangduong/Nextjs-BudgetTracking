import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col w-full h-screen">
      <Navbar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
