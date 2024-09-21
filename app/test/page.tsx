"use client";

import { useRef } from "react";

export default function Test() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    console.log("ctx", ctx);
    if (ctx) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 700, 700);
      ctx.fillStyle = "red";
      ctx.font = "bold 18px Arial";
      ctx.fillText("asdasd s dsd s dsdasd sadasdasd", 70, 70);
    }
  };

  return (
    <div>
      <div className="relative h-[700px] w-[700px]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <button className="z-50 relative" onClick={handleGenerate}>
        Generate
      </button>
    </div>
  );
}
