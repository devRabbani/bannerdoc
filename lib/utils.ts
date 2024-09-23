import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AlignType, FillModeType, PaletteType } from "./types";
import {
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
  customColor2: string,
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
  selectedColors: string[],
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
      1000,
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
  selectedColors: string[],
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
  patternIntensity: number,
) => {
  const backgroundColor = getAverageColor(ctx, IMAGE_WIDTH, IMAGE_HEIGHT);
  const patternColor = getPatternColor(backgroundColor);

  const patternFn =
    backgroundPatterns[Math.floor(Math.random() * backgroundPatterns.length)];
  const pattern = patternFn(ctx, patternColor);

  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.globalAlpha = patternIntensity;
    ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
    ctx.globalAlpha = 1;
  }
};

export const setupTextRendering = (
  ctx: CanvasRenderingContext2D,
  align: AlignType,
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
  maxWidth: number,
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
  fontSize: number,
) => {
  const maxWidth = IMAGE_WIDTH - IMAGE_PADDING * 2;
  const headerLines = renderTextWithWrapping(
    ctx,
    headerText,
    fontSize * 0.75,
    maxWidth,
  );
  const mainLines = renderTextWithWrapping(ctx, mainText, fontSize, maxWidth);

  // Calculate total Height
  const heaederHeight = headerText.length
    ? headerLines.length * fontSize * 0.9
    : 0;
  const mainHeight = mainLines.length * fontSize * 1.2;
  const space = headerText.length ? fontSize * 0.5 : 0;
  const totalHeight = heaederHeight + mainHeight + space;

  // Starting point vertical
  let y = (IMAGE_HEIGHT - totalHeight) / 2;

  if (headerText.length) {
    ctx.font = `bold ${fontSize * 0.75}px Arial`;
    headerLines.forEach((line, index) => {
      ctx.fillText(line, x, y + index * fontSize * 0.9);
    });
    y += heaederHeight + space;
  }

  ctx.font = `bold ${fontSize}px Arial`;
  mainLines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * fontSize * 1.2);
  });
};

// Function to get the average color of the canvas
export const getAverageColor = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
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

// Function to get a pattern color based on the background color
export const getPatternColor = (backgroundColor: string) => {
  const rgb = backgroundColor.match(/\d+/g);
  if (rgb) {
    const brightness =
      (parseInt(rgb[0]) * 299 +
        parseInt(rgb[1]) * 587 +
        parseInt(rgb[2]) * 114) /
      1000;
    return brightness > 128
      ? "rgba(0, 0, 0, 0.14)"
      : "rgba(255, 255, 255, 0.14)";
  }
  return "rgba(0, 0, 0, 0.14)";
};

// Patterns
const backgroundPatterns = [
  createDiagonalPattern,
  createDotPattern,
  createCrossPattern,
  createWavePattern,
  createCirclePattern,
  () => null, // No pattern option
];

// Pattern creation functions (unchanged)
function createDiagonalPattern(ctx: CanvasRenderingContext2D, color: string) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  patternCanvas.width = patternCanvas.height = 10;
  if (patternCtx) {
    patternCtx.strokeStyle = color;
    patternCtx.lineWidth = 1;
    patternCtx.beginPath();
    patternCtx.moveTo(0, 10);
    patternCtx.lineTo(10, 0);
    patternCtx.stroke();
  }
  return ctx.createPattern(patternCanvas, "repeat");
}

function createDotPattern(ctx: CanvasRenderingContext2D, color: string) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  patternCanvas.width = patternCanvas.height = 10;
  if (patternCtx) {
    patternCtx.fillStyle = color;
    patternCtx.beginPath();
    patternCtx.arc(5, 5, 1, 0, Math.PI * 2);
    patternCtx.fill();
  }
  return ctx.createPattern(patternCanvas, "repeat");
}

function createCrossPattern(ctx: CanvasRenderingContext2D, color: string) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  patternCanvas.width = patternCanvas.height = 10;
  if (patternCtx) {
    patternCtx.strokeStyle = color;
    patternCtx.lineWidth = 1;
    patternCtx.beginPath();
    patternCtx.moveTo(5, 0);
    patternCtx.lineTo(5, 10);
    patternCtx.moveTo(0, 5);
    patternCtx.lineTo(10, 5);
    patternCtx.stroke();
  }
  return ctx.createPattern(patternCanvas, "repeat");
}

function createWavePattern(ctx: CanvasRenderingContext2D, color: string) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  patternCanvas.width = 20;
  patternCanvas.height = 10;
  if (patternCtx) {
    patternCtx.strokeStyle = color;
    patternCtx.lineWidth = 1;
    patternCtx.beginPath();
    patternCtx.moveTo(0, 5);
    patternCtx.quadraticCurveTo(5, 0, 10, 5);
    patternCtx.quadraticCurveTo(15, 10, 20, 5);
    patternCtx.stroke();
  }
  return ctx.createPattern(patternCanvas, "repeat");
}

function createCirclePattern(ctx: CanvasRenderingContext2D, color: string) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  patternCanvas.width = patternCanvas.height = 20;
  if (patternCtx) {
    patternCtx.strokeStyle = color;
    patternCtx.lineWidth = 1;
    patternCtx.beginPath();
    patternCtx.arc(10, 10, 5, 0, Math.PI * 2);
    patternCtx.stroke();
  }
  return ctx.createPattern(patternCanvas, "repeat");
}
