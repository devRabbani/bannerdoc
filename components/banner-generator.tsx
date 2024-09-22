"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { backgroundPatterns, colorPalettes } from "@/lib/constants";
import {
  applyBackground,
  applyPattern,
  getAverageColor,
  getContrastColor,
  renderText,
  renderTextWithWrapping,
  selectColors,
  setupTextRendering,
} from "@/lib/utils";
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
  User2Icon,
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
import BannerPreview from "./banner-preview";

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

  const generateBanner = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const selectedColors = selectColors(
          palette,
          fillMode,
          customColor1,
          customColor2
        );
        applyBackground(ctx, fillMode, selectedColors);
        await applyPattern(ctx, patternIntensity);
        const x = setupTextRendering(ctx, align);
        renderText(ctx, headerText, text, x, fontSize);
        setBannerUrl(canvas.toDataURL());
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
      <div className="">
        <div className="relative aspect-[3/1] w-full mx-auto bg-muted-foreground/80 rounded-md overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="flex items-end justify-between">
          <div className="w-[22.3%]  aspect-square rounded-full border-4 border-background -mt-[11%] ml-5 relative bg-gray-700 grid place-items-center text-gray-100 ">
            <User2Icon className="h-1/2 w-1/2" />
          </div>
          <Button variant="outline" className="mb-3 mr-3">
            Download
          </Button>
        </div>
      </div>
      <div className="">
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
    </div>
  );
}
