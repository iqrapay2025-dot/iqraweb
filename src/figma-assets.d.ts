// Allow importing files from the `figma:` virtual namespace used by the
// design plugin/loader. Cover both the specific `figma:asset/*` pattern
// and a broader `figma:*` fallback so TypeScript's module resolution
// doesn't complain in the editor.
declare module "figma:asset/*" {
  const value: string;
  export default value;
}

declare module "figma:*" {
  const value: string;
  export default value;
}
