export interface ToolkitSettings {
  templateFolder: string;
  scriptsFolder: string;
}

export const DEFAULT_SETTINGS: ToolkitSettings = {
  templateFolder: ".",
  scriptsFolder: ".obsidian/scripts",
};
