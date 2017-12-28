declare const process: {
  env: Record<string, string | number>
};

declare namespace React {
  interface HTMLAttributes<T> {
    class?: string;
  }

  interface SVGAttributes<T> {
    class?: string;
  }
}
