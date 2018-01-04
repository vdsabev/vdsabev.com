import { VNode } from 'picodom';

declare global {
  export type Props<ElementType> = CustomProps<Partial<ElementType>>;

  type CustomProps<P extends {}> = P & {
    key?: number | string;
    class?: string;
    oncreate?(el: VNode<P>): void;
    onupdate?(el: VNode<P>): void;
    onremove?(el: VNode<P>, done: () => void): void;
    ondestroy?(el: VNode<P>): void;
  };

  export type Children<P = {}> = Array<VNode<P> | string | number | null>;
}
