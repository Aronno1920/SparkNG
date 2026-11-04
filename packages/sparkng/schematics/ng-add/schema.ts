export type Theme = 'Aura' | 'Lara' | 'Material' | 'Nora' | 'Shadcn';

export interface Schema {
    project?: string;
    theme?: Theme;
    skipInstall?: boolean;
}
