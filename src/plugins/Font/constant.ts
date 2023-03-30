export const fontWeigthOptions = [
  { label: "默认粗细", value: "" },
  ...new Array(9).fill({}).map((item, index) => ({
    label: `${(index + 1) * 100}`,
    value: `${(index + 1) * 100}`,
  })),
];

export const textAlignOptions = ["left", "center", "right"];

export const textDecorationOptions = ["none", "line-through", "underline"];

export const fontFamilyOptions = [
  {
    label: "默认字体",
    value: "",
  },
];
