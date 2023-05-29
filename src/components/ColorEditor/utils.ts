import Color from "color";
import colorString from "color-string";

export const getHex = (str: string, alpha?: string) => {
  let color = new Color(str);
  if (alpha !== undefined && alpha !== null) {
    let a = parseInt(alpha);
    if (a < 0) a = 0;
    else if (a > 100) a = 100;
    color = color.alpha(a / 100);
  }
  if (color.alpha() === 1) {
    return color.hex().toLowerCase();
  } else {
    return color.hexa().toLowerCase();
  }
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
