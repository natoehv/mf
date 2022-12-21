export type Microservice<T = Record<string, unknown>> = {
  url: string;
  scope: string;
  module: string;
  manifest?: string;
  props?: T;
};
