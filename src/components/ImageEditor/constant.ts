export const defaultImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAEpJREFUSEvtlKEOAEAIQuH/P5pLNgkXLIrRuTGBPQIQmpHaNUh257D3ESi/Flsk89t3W0y7GIFqkbN0gUVBxQFUjIccVBxAxXTID1edp90t8GAGAAAAAElFTkSuQmCC";

export const defaultBackgroundRepeat = 'no-repeat';

export const defaultBackgroundPosition = "center top";

export const defaultBackgroundSize = '100% 100%';

export const backgroundSizeOptions = [
  { label: "适应", value: "contain" },
  { label: "填充", value: "cover" },
  { label: "铺满", value: "100% 100%" },
  { label: "铺满x轴", value: "100% auto" },
  { label: "铺满y轴", value: "auto 100%" },
];

// background-repeat选择项
export const backgroundRepeatOptions = [
  { label: "平铺", value: "repeat" },
  { label: "不平铺", value: "no-repeat" },
];

// background-position选择项
export const backgroundPositionOptions = [
  { label: "居上", value: "center top" },
  { label: "居中", value: "center center" },
  { label: "居下", value: "center bottom" },
  { label: "居左", value: "left center" },
  { label: "居右", value: "right center" },
  { label: "左上", value: "left top" },
  { label: "左下", value: "left bottom" },
  { label: "右上", value: "right top" },
  { label: "右下", value: "right bottom" },
];
