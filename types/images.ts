export const IMAGE_EXTENSTIONS = ["PNG", "JPG"] as const;

export type ImageExtenstions = typeof IMAGE_EXTENSTIONS[number];

export const ICON_EXTENSTIONS = ["PNG", "JPG", "SVG"] as const;

export type IconExtenstions = typeof ICON_EXTENSTIONS[number];
