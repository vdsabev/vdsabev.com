import { VNode } from 'ultradom';

declare global {
  export type Props<ElementType = HTMLElement> = CustomProps<Partial<ElementType>>;
  export type Children<P = {}> = Array<VNode<P> | string | number | null>;
}

type CustomProps<P extends {}> = P & Partial<ComponentProps<P>>;

interface ComponentProps<P extends {}> {
  key: number | string;
  class: string;
  oncreate(el: VNode<P>): void;
  onupdate(el: VNode<P>, oldAttributes: Record<string, any>): void;
  onremove(el: VNode<P>, done: () => void): void;
  ondestroy(el: VNode<P>): void;
}
