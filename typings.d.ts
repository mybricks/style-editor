declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.svg" {
  const ReactComponent: JSX.IntrinsicElements.svg;
  export { ReactComponent };
}
