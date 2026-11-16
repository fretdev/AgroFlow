import React, { ReactNode } from "react";

interface TransporterLayoutProps {
  children: ReactNode;
}

export default function TransporterLayout({ children }: TransporterLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <header className="bg-white border-b border-zinc-200 px-6 py-4">
        <h1 className="text-xl font-bold text-zinc-900">AgroFlow Transporter Workspace</h1>
      </header>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}