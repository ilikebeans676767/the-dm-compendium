export interface FormatterItem {
  /** Shown in the tp.system.suggester dropdown */
  label: string;
  /** Markdown inserted into the note */
  body: string;
}

export abstract class BaseFormatter {
  abstract load(dataDir: string): Promise<FormatterItem[]>;
  protected abstract format(raw: any): FormatterItem;
}
