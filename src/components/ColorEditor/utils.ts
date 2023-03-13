import colorString from "color-string";

export const getHex = (color: string) => {
  const rgba = colorString.get(color || "transparent")?.value as number[];
  let alpha = rgba?.pop();
  if (alpha === null || alpha === undefined) alpha = 1;
  return {
    hex: colorString.to.hex(rgba),
    alpha: alpha * 100 + "%",
  };
};

export const toRgba = (hex: string, alpha: string | number) => {
  const rgba = (colorString.get(hex)?.value as number[]) || [255, 255, 255, 0];
  rgba.length === 4 && rgba.pop();
  let a = typeof alpha === "string" ? parseInt(alpha) : alpha;
  if (a < 0) a = 0;
  else if (a > 100) a = 100;
  rgba.push(a);
  return colorString.to.rgb(rgba);
};

export const checkColorType = (value: string) => {
  if (!value || typeof value !== "string") return;
  const rgbaColor = colorString.get(value);
  if (rgbaColor) {
    // 纯色
    return "SOLID";
  } else if (value.match(/^var\(--(.*)\)$/)) {
    // 主题色
    return "THEME";
  } else if (value.match(/linear-gradient\("?'?.*"?'?\)/g)) {
    // 线性渐变
    return "GRADIENT";
  } else if (value.match(/url\("?'?.*"?'?\)/g)) {
    // 背景图
    return "IMAGE";
  }
};
