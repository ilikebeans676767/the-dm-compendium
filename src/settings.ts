export interface ToolkitSettings {
  templateFolder: string;
  scriptsFolder: string;
}

export const DEFAULT_SETTINGS: ToolkitSettings = {
  templateFolder: "Templates",
  scriptsFolder: ".obsidian/scripts",
};
