// LazyService.tsx

import { lazy, ReactNode, Suspense } from 'react';

import { useDynamicScript } from '../hooks/useDynamicScript';
import { useHandleVersion } from '../hooks/useHandleVersion';
import { ErrorBoundary } from './ErrorBoundary';
import { loadComponent } from './loadComponent';
import { Microservice } from './types'
// import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

interface ILazyServiceProps<T = Record<string, unknown>> {
  microservice: Microservice<T>;
  loadingMessage?: ReactNode;
  errorMessage?: ReactNode;
  props?: T
}

export default function LazyService<T = Record<string, unknown>>({
  microservice,
  loadingMessage,
  errorMessage,
  props,
}: ILazyServiceProps<T>): JSX.Element {
  const { v } = useHandleVersion(microservice.manifest);
  const { ready, failed } = useDynamicScript(microservice.url, v);

  const errorNode = errorMessage || <span>Failed to load dynamic script: {microservice.url}</span>;

  if (failed) {
    return <>{errorNode}</>;
  }

  const loadingNode = loadingMessage || <span>Loading dynamic script: {microservice.url}</span>;

  if (!ready) {
    return <>{loadingNode}</>;
  }

  const Component = lazy(loadComponent(microservice.scope, microservice.module));

  return (
    <ErrorBoundary fallback={errorNode}>
      <Suspense fallback={loadingNode}>
        <>
          <Component {...(microservice.props || props || {})} />
        </>
      </Suspense>
      </ErrorBoundary>
  );
}