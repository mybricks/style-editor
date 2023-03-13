export const borderStyleOptions = [
  {
    label: "无",
    value: "none",
  },
  {
    label: "实线",
    value: "solid",
  },
  {
    label: "虚线",
    value: "dashed",
  },
];

export const borderWidthMap = {
    borderTopWidth: "上边框宽",
    borderBottomWidth: "下边框宽",
    borderLeftWidth: "左边框宽",
    borderRightWidth: "右边框宽",
  } as Record<string, string>,
  borderRadiusMap = {
    borderTopLeftRadius: "左上圆角",
    borderTopRightRadius: "右上圆角",
    borderBottomLeftRadius: "右上圆角",
    borderBottomRightRadius: "右下圆角",
  } as Record<string, string>;
