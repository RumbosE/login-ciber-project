import { useState, useEffect } from "react";
export default function Home() {

  return (
    <main className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <span className="text-slate-100 font-bold text-6xl text-center">HOME:</span>
        <h1 className="text-slate-300 font-bold text-4xl underline mb-5 text-center">Bienvenido a la pagina web de PCIBER</h1>
        <h1 className="text-slate-300 font-bold text-4xl underline mb-5 text-center">Proyecto CIBER</h1>
      </div>
    </main>
  );
}
