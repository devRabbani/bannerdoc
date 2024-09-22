import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AlignType, FillModeType, PaletteType } from "./types";
import {
  backgroundPatterns,
  colorPalettes,
  HALF_IMAGE_HEIGHT,
  HALF_IMAGE_WIDTH,
  IMAGE_HEIGHT,
  IMAGE_PADDING,
  IMAGE_WIDTH,
} from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Select Colors
export const selectColors = (
  palette: PaletteType,
  fillMode: FillModeType,
  customColor1: string,
  customColor2: string
) => {
  if (palette === "custom") {
    return [customColor1, customColor2];
  }
  // Color Count 50% Chance , If fillmode flat than only one color
  const colorCount = fillMode === "flat" ? 1 : Math.random() < 0.5 ? 2 : 3;
  // Select colors
  const selectedColorPalette = colorPalettes[palette];

  return [...selectedColorPalette]
    .sort(() => Math.random() - 0.5)
    .slice(0, colorCount);
};

// Create Gradient
export const createGradient = (
  ctx: CanvasRenderingContext2D,
  selectedColors: string[]
) => {
  const gradientType = Math.random() < 0.5 ? "linear" : "radial";
  let gradient;

  if (gradientType === "linear") {
    const angle = Math.random() * 360;

    const startX =
      HALF_IMAGE_WIDTH + HALF_IMAGE_WIDTH * Math.cos((angle * Math.PI) / 180);
    const startY =
      HALF_IMAGE_HEIGHT + HALF_IMAGE_HEIGHT * Math.sin((angle * Math.PI) / 180);
    const endX =
      HALF_IMAGE_WIDTH - HALF_IMAGE_WIDTH * Math.cos((angle * Math.PI) / 180);
    const endY =
      HALF_IMAGE_HEIGHT - HALF_IMAGE_HEIGHT * Math.sin((angle * Math.PI) / 180);

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

  return gradient;
};

// Apply Background
export const applyBackground = (
  ctx: CanvasRenderingContext2D,
  fillMode: FillModeType,
  selectedColors: string[]
) => {
  // Is gradiant 70% chance, If fillmode gradient 100% chance
  const isGradient =
    fillMode === "gradient" || (fillMode === "auto" && Math.random() < 0.7);

  if (isGradient) {
    ctx.fillStyle = createGradient(ctx, selectedColors);
  } else {
    ctx.fillStyle = selectedColors[0];
  }

  ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
};

// Apply Pattern
export const applyPattern = (
  ctx: CanvasRenderingContext2D,
  patternIntensity: number
) => {
  return new Promise<void>((resolve) => {
    const patternImg = new Image();
    patternImg.src =
      backgroundPatterns[Math.floor(Math.random() * backgroundPatterns.length)];
    patternImg.onload = () => {
      if (patternImg.src !== "data:,") {
        const pattern = ctx.createPattern(patternImg, "repeat");
        if (pattern) {
          ctx.globalAlpha = patternIntensity;
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
          ctx.globalAlpha = 1;
        }
      }
      resolve();
    };
  });
};

export const setupTextRendering = (
  ctx: CanvasRenderingContext2D,
  align: AlignType
) => {
  const backgroundColor = getAverageColor(ctx, IMAGE_WIDTH, IMAGE_HEIGHT);
  const textColor = getContrastColor(backgroundColor);

  ctx.fillStyle = textColor;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.shadowColor =
    textColor === "#FFFFFF" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";
  ctx.shadowBlur = 10;

  let x;
  if (align === "right") x = IMAGE_WIDTH - IMAGE_PADDING;
  else if (align === "left") x = IMAGE_PADDING;
  else x = HALF_IMAGE_WIDTH;

  return x;
};

export const renderTextWithWrapping = (
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  maxWidth: number
) => {
  ctx.font = `bold ${fontSize}px Arial`;
  const words = text.split(" ");
  let line = "";
  const lines: string[] = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  return lines;
};

export const renderText = (
  ctx: CanvasRenderingContext2D,
  headerText: string,
  mainText: string,
  x: number,
  fontSize: number
) => {
  const maxWidth = IMAGE_WIDTH - IMAGE_PADDING * 2;
  let y = headerText.length ? 200 : 250;

  if (headerText.length) {
    const headerLines = renderTextWithWrapping(
      ctx,
      headerText,
      fontSize * 0.75,
      maxWidth
    );
    headerLines.forEach((line, index) => {
      ctx.fillText(line, x, y + index * fontSize * 0.9);
    });
    y += headerLines.length * fontSize * 0.9 + fontSize * 0.5;
  }

  const mainLines = renderTextWithWrapping(ctx, mainText, fontSize, maxWidth);
  mainLines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * fontSize * 1.2);
  });
};

// Function to get the average color of the canvas
export const getAverageColor = (
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
export const getContrastColor = (color: string) => {
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
