"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { backgroundPatterns, colorPalette } from "@/lib/constants";

const IMAGE_WIDTH = 1500;
const HALF_IMAGE_WIDTH = 1500 / 2;
const IMAGE_HEIGHT = 500;
const HALF_IMAGE_HEIGHT = 500 / 2;

export default function BannerGenerator() {
  const [text, setText] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateBanner = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Color Count 50% Chance
        const colorCount = Math.random() < 0.5 ? 2 : 3;
        // Select colors
        const selectedColors = [...colorPalette]
          .sort(() => Math.random() - 0.5)
          .slice(0, colorCount);

        // Is gradiant 70% chance
        const isGradient = Math.random() < 0.7;
        if (isGradient) {
          const gradientType = Math.random() < 0.5 ? "linear" : "radial";
          let gradient;

          if (gradientType === "linear") {
            const angle = Math.random() * 360;

            const startX =
              HALF_IMAGE_WIDTH +
              HALF_IMAGE_WIDTH * Math.cos((angle * Math.PI) / 180);
            const startY =
              HALF_IMAGE_HEIGHT +
              HALF_IMAGE_HEIGHT * Math.sin((angle * Math.PI) / 180);
            const endX =
              HALF_IMAGE_WIDTH -
              HALF_IMAGE_WIDTH * Math.cos((angle * Math.PI) / 180);
            const endY =
              HALF_IMAGE_HEIGHT -
              HALF_IMAGE_HEIGHT * Math.sin((angle * Math.PI) / 180);

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
            gradient.addColorStop(index / (selectedColors.length - 1), color); // 0,0.5,1 or 0,1
          });
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = selectedColors[0];
        }
        // Fill the canvas with the selected color
        ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

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
              ctx.globalAlpha = 0.8;
              ctx.fillStyle = pattern;
              ctx.fillRect(0, 0, 1500, 500);
              ctx.globalAlpha = 1;
            }
          }

          // Add text with a contrasting color and shadow for readability
          const backgroundColor = getAverageColor(
            ctx,
            IMAGE_WIDTH,
            IMAGE_HEIGHT
          );
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
          let y = HALF_IMAGE_HEIGHT; // Start in the middle of the canvas
          for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + " ";
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > 1400 && i > 0) {
              ctx.fillText(line, HALF_IMAGE_WIDTH, y);
              line = words[i] + " ";
              y += 60; // 60 is the line height
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, HALF_IMAGE_WIDTH, y);

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

    // Image Data will be in this format [r,g,b,a,r,g,b,a,r,g,b,a, ...]
    // Skipping 4 beacuse of extra allpha value
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
      // Calculate brightness using the formula: (R*299 + G*587 + B*114) / 1000
      // Numbers are weighted based on human perception of color
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
