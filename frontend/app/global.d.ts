declare module 'class-variance-authority' {
  export type VariantProps<T> = T extends (...args: any[]) => any ? ReturnType<T> : never;

  export function cva(
    base?: string,
    options?: {
      variants?: Record<string, Record<string, string>>;
      defaultVariants?: Record<string, string>;
    }
  ): (...args: any[]) => string;
}
