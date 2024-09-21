import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
