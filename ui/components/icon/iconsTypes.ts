export const icons = [
    "chevron.down.16",
    "frame.16",
    "component.16",
    "componentset.16",
    "instance.16",
    "check.16",
    "folder.16",
    "dev.16",
    "image.16",
    "ellipse.16",
    "line.16",
    "polygon.16",
    "rectangle.16",
    "star.16",
    "boolean.union.16",
    "group.16",
    "page.16",
    "text.16",
    "warning.16",
    "complex.vector.16",

    "codeSnippet.24",
    "clipboard.small.24",
    "chevron.down.24"
] as const;

export type TIcons = (typeof icons)[number];