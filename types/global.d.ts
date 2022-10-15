declare type TRouteMeta = {
  title?: string;
  icon?: string;
  iconEp?: string;
};

declare module "nprogress" {
  export const start: () => void, done: () => void, configure: (any) => void;
}
