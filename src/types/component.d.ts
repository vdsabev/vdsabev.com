import { VNode } from 'picodom';

declare global {
  export type Props<ElementType> = CustomProps<Partial<ElementType>>;

  type CustomProps<P extends {}> = P & {
    key?: number | string;
    class?: string;
    oncreate?(el: VNode<P>): void;
    onupdate?(el: VNode<P>): void;
    // TODO: Update signature when picodom hits 2.0
    // https://github.com/hyperapp/hyperapp/blob/master/docs/concepts/lifecycle-events.md#onremove
    // onremove?(el: VNode<P>, done: () => void): void;
    onremove?(el: VNode<P>): (done: Function) => any | void;
    ondestroy?(el: VNode<P>): void;
  };

  export type Children<P = {}> = Array<VNode<P> | string | number | null>;
}
