declare module '@hyperapp/router/src/location' {
  const location: {
    state: {
      pathname: string,
      previous: string
    },
    actions: {
      go: (pathname: string) => void,
      set: <T>(data: T) => T
    },
    subscribe: (actions: any) => () => void
  }
}

declare module '@hyperapp/router/src/Redirect' {
  const Redirect: any;
}

declare module '@hyperapp/router/src/Route' {
  const Route: any;
}

declare module '@hyperapp/router/src/Switch' {
  const Switch: any;
}
