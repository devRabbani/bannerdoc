"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  applyBackground,
  applyPattern,
  renderText,
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
import { ChevronDown, User2Icon } from "lucide-react";

import FormDiv from "./form-div";
import AlignItemsRadio from "./align-items-radio";
import { ColorModeRadio } from "./color-mode-radio";
import SelectColorPalette from "./select-color-palette";
import BannerText from "./banner-text";
import CustomColorPicker from "./custom-color-picker";
import SettingSliders from "./setting-sliders";
import { AlignType, FillModeType, PaletteType } from "@/lib/types";

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
  const bannerContainerRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setBannerUrl("");
    setHeaderText("");
    setText("");
    setAlign("center");
    setFillMode("auto");
    setPalette("cool");
    setPatternIntensity(0.1);
    setFontSize(48);
    setCustomColor1("#000000");
    setCustomColor2("#ffffff");
  };

  const downloadBanner = () => {
    if (bannerUrl) {
      const link = document.createElement("a");
      link.href = bannerUrl;
      link.download = "twitter-banner.png";
      link.click();
    }
  };

  const generateBanner = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const selectedColors = selectColors(
          palette,
          fillMode,
          customColor1,
          customColor2,
        );
        applyBackground(ctx, fillMode, selectedColors);
        await applyPattern(ctx, patternIntensity);
        const x = setupTextRendering(ctx, align);
        renderText(ctx, headerText, text, x, fontSize);
        bannerContainerRef.current?.scrollIntoView({ behavior: "smooth" });
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
    <div
      ref={bannerContainerRef}
      className="mx-auto scroll-mt-56 space-y-6 py-4"
    >
      <div className="">
        <div className="relative mx-auto aspect-[3/1] w-full scroll-mt-56 overflow-hidden rounded-md bg-muted-foreground/80">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        </div>
        <div className="flex items-end justify-between">
          <div className="relative -mt-[8.5%] ml-5 grid aspect-square w-[17%] place-items-center rounded-full border-2 border-background bg-gray-700 text-gray-100 sm:-mt-[11%] sm:w-[22.3%] sm:border-4">
            <User2Icon className="h-1/2 w-1/2" />
          </div>
          <Button
            disabled={!bannerUrl}
            onClick={downloadBanner}
            variant="outline"
            className="-mb-4 mr-3 sm:mb-3"
          >
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
                className="-mt-5 flex w-fit items-center gap-1 bg-background px-2"
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
            <div className="flex flex-col items-start gap-8 md:flex-row-reverse">
              <div className="flex w-full justify-between gap-2 min-[370px]:justify-start min-[370px]:gap-3 sm:gap-4 md:w-fit md:flex-col">
                <AlignItemsRadio align={align} setAlign={setAlign} />
                <ColorModeRadio fillMode={fillMode} setFillMode={setFillMode} />
              </div>
              <div className="w-full space-y-4">
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
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <Button onClick={generateBanner} className="py-5 sm:py-2">
            Generate Banner
          </Button>
          <Button
            onClick={handleReset}
            variant="secondary"
            className="py-5 sm:w-36 sm:py-2"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
