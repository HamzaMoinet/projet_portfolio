// Utilitaire pour concaténer des classes conditionnellement
export function cn(...args: (string | number | boolean | undefined | null | string[])[]): string {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .join(' ');
}
