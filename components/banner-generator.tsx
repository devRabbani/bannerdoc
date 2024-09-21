"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { backgroundPatterns, colorPalette } from "@/lib/constants";

export default function BannerGenerator() {
  const [text, setText] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateBanner = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Select colors
        const selectedColors = [...colorPalette]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        // Create gradient
        const gradientType = Math.random() < 0.5 ? "linear" : "radial";
        let gradient;

        if (gradientType === "linear") {
          const angle = Math.random() * 360;
          const startX = 750 + 750 * Math.cos((angle * Math.PI) / 180);
          const startY = 250 + 250 * Math.sin((angle * Math.PI) / 180);
          const endX = 750 - 750 * Math.cos((angle * Math.PI) / 180);
          const endY = 250 - 250 * Math.sin((angle * Math.PI) / 180);
          gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        } else {
          const centerX = 750 + (Math.random() - 0.5) * 500;
          const centerY = 250 + (Math.random() - 0.5) * 200;
          gradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            1000
          );
        }

        // Add color stops
        selectedColors.forEach((color, index) => {
          gradient.addColorStop(index / (selectedColors.length - 1), color);
        });

        // Fill background with gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1500, 500);

        // Apply subtle pattern
        const patternImg = new Image();
        patternImg.src =
          backgroundPatterns[
            Math.floor(Math.random() * backgroundPatterns.length)
          ];
        patternImg.onload = () => {
          if (patternImg.src !== "data:,") {
            const pattern = ctx.createPattern(patternImg, "repeat");
            if (pattern) {
              ctx.globalAlpha = 0.3;
              ctx.fillStyle = pattern;
              ctx.fillRect(0, 0, 1500, 500);
              ctx.globalAlpha = 1;
            }
          }

          // Add text with a contrasting color and shadow for readability
          const backgroundColor = getAverageColor(ctx, 1500, 500);
          const textColor = getContrastColor(backgroundColor);

          ctx.fillStyle = textColor;
          ctx.font = "bold 48px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.shadowColor =
            textColor === "#FFFFFF"
              ? "rgba(0,0,0,0.5)"
              : "rgba(255,255,255,0.5)";
          ctx.shadowBlur = 10;

          const words = text.split(" ");
          let line = "";
          let y = 250; // Start in the middle of the canvas
          for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + " ";
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > 1400 && i > 0) {
              ctx.fillText(line, 750, y);
              line = words[i] + " ";
              y += 60;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, 750, y);

          setBannerUrl(canvas.toDataURL("image/png"));
        };
      }
    }
  };

  // Function to get the average color of the canvas
  const getAverageColor = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    let r = 0,
      g = 0,
      b = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      r += imageData.data[i];
      g += imageData.data[i + 1];
      b += imageData.data[i + 2];
    }

    const pixelCount = imageData.data.length / 4;
    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    return `rgb(${r},${g},${b})`;
  };

  // Function to get a contrasting color (black or white)
  const getContrastColor = (color: string) => {
    const rgb = color.match(/\d+/g);
    if (rgb) {
      const brightness =
        (parseInt(rgb[0]) * 299 +
          parseInt(rgb[1]) * 587 +
          parseInt(rgb[2]) * 114) /
        1000;
      return brightness > 128 ? "#000000" : "#FFFFFF";
    }
    return "#000000";
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 1500;
      canvasRef.current.height = 500;
    }
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <Label htmlFor="bannerText">Enter text for your banner:</Label>
        <Textarea
          id="bannerText"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your banner text here..."
          className="mt-1"
        />
        <Button onClick={generateBanner} className="mt-2">
          Generate Banner
        </Button>
      </div>

      <div className="relative aspect-[3/1] w-full max-w-2xl mx-auto">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        {bannerUrl && (
          <img
            src={bannerUrl}
            alt="Generated Twitter Banner"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
