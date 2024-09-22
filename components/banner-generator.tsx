"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { backgroundPatterns, colorPalettes } from "@/lib/constants";
import { getAverageColor, getContrastColor } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Blend,
  ChevronDown,
  Shuffle,
  Square,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import FormDiv from "./form-div";
import AlignItemsRadio from "./align-items-radio";
import { ColorModeRadio } from "./color-mode-radio";
import SelectColorPalette from "./select-color-palette";
import BannerText from "./banner-text";
import CustomColorPicker from "./custom-color-picker";
import SettingSliders from "./setting-sliders";
import { AlignType, FillModeType, PaletteType } from "@/lib/types";

const IMAGE_WIDTH = 1500;
const HALF_IMAGE_WIDTH = 1500 / 2;
const IMAGE_HEIGHT = 500;
const HALF_IMAGE_HEIGHT = 500 / 2;

export default function BannerGenerator() {
  const [bannerUrl, setBannerUrl] = useState("");
  const [headerText, setHeaderText] = useState("");
  const [text, setText] = useState("");
  const [align, setAlign] = useState<AlignType>("center");
  const [fillMode, setFillMode] = useState<FillModeType>("auto");
  const [palette, setPalette] = useState<PaletteType>("cool");
  const [patternIntensity, setPatternIntensity] = useState(0.1);
  const [fontSize, setFontSize] = useState(48);
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [customColor1, setCustomColor1] = useState("#000000");
  const [customColor2, setCustomColor2] = useState("#ffffff");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateBanner = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        let selectedColors: string[];
        if (palette === "custom") {
          selectedColors = [customColor1, customColor2];
        } else {
          // Color Count 50% Chance , If fillmode flat than only one color
          const colorCount =
            fillMode === "flat" ? 1 : Math.random() < 0.5 ? 2 : 3;
          // Select colors
          const selectedColorPalette = colorPalettes[palette];
          selectedColors = [...selectedColorPalette]
            .sort(() => Math.random() - 0.5)
            .slice(0, colorCount);
        }

        // Is gradiant 70% chance, If fillmode gradient 100% chance
        const isGradient =
          fillMode === "gradient" ||
          (fillMode === "auto" && Math.random() < 0.7);

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
              ctx.globalAlpha = patternIntensity;
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
          ctx.textAlign = align;
          ctx.textBaseline = "middle";
          ctx.shadowColor =
            textColor === "#FFFFFF"
              ? "rgba(0,0,0,0.5)"
              : "rgba(255,255,255,0.5)";
          ctx.shadowBlur = 10;

          let x;
          if (align === "right") x = 1450;
          else if (align === "left") x = 50;
          else x = 750;

          let y = headerText.length ? 200 : 250;

          if (headerText.length) {
            ctx.font = `bold ${fontSize * 0.75}px Arial`;
            ctx.fillText(headerText, x, y);
            y += 60;
          }

          ctx.font = `bold ${fontSize}px Arial`;
          const words = text.split(" ");
          let line = "";

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
          ctx.fillText(line, x, y);

          setBannerUrl(canvas.toDataURL("image/png"));
        };
      }
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 1500;
      canvasRef.current.height = 500;
    }
  }, []);

  return (
    <div className="mx-auto py-4 space-y-6">
      <div>
        <BannerText text={text} setText={setText} />
        <Collapsible
          className="mt-6"
          open={showAdvanced}
          onOpenChange={setShowAdvanced}
        >
          <CollapsibleTrigger asChild>
            <div className="w-full">
              <Separator />
              <Button
                variant="link"
                className="-mt-5 bg-background gap-1 w-fit px-2 flex items-center"
              >
                Show Advanced{" "}
                <ChevronDown
                  className={`mt-0.5 h-5 w-5 transition-transform ${
                    showAdvanced ? "-rotate-180" : ""
                  }`}
                />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 py-2">
            <FormDiv>
              <Label htmlFor="headerText">Header text:</Label>
              <Input
                id="headerText"
                value={headerText}
                onChange={(e) => setHeaderText(e.target.value)}
                placeholder="Enter your header text here..."
              />
            </FormDiv>
            <div className="flex flex-row-reverse gap-8 items-start">
              <div className="space-y-4">
                <AlignItemsRadio align={align} setAlign={setAlign} />
                <ColorModeRadio fillMode={fillMode} setFillMode={setFillMode} />
              </div>
              <div className="space-y-4 w-full">
                <div className="flex gap-3">
                  <SelectColorPalette value={palette} setValue={setPalette} />
                  {palette === "custom" && (
                    <CustomColorPicker
                      customColor1={customColor1}
                      customColor2={customColor2}
                      setCustomColor1={setCustomColor1}
                      setCustomColor2={setCustomColor2}
                    />
                  )}
                </div>

                <SettingSliders
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                  patternIntensity={patternIntensity}
                  setPatternIntensity={setPatternIntensity}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Button onClick={generateBanner} className="mt-6">
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
