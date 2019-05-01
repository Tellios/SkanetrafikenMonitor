import { Color } from "./Color";

export function resolveColorClass(color: Color): string {
  return `color-${color}`;
}
