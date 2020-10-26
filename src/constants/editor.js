// List of languages our editor will display
// in the dropdown button
export const supportedLanguages = [
  "javascript",
  "python",
  "php",
  "java",
  "c",
  "cpp",
];

// Returns the 'mode' that codemirror expects
// in order to do the syntax highlighting
export function getLanguageMode(lang) {
  switch (lang) {
    case "c":
      return "text/x-csrc";
    case "cpp":
      return "text/x-c++src";
    case "java":
      return "text/x-java";
    default:
      return lang;
  }
}
