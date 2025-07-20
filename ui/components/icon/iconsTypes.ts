export const icons = [
    "chevron.down.16",
    "frame.16",
    "component.16",
    "instance.16",
    "check.16",
    "folder.16",
    "dev.16",
    "image.16",

    "codeSnippet.24",
    "clipboard.small.24",
    "chevron.down.24"
] as const;

export type TIcons = (typeof icons)[number];