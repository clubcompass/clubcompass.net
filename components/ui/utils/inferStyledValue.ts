export type InferStyledValue = (
  value: string | number | boolean | undefined,
  def: string
) => string;

export const inferStyledValue: InferStyledValue = (value, def) => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return `${value}px`;
  if (typeof value === "boolean") return value && def;
  return def;
};
