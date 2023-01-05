import React from "react";

export interface BoundaryProps {
  children: React.ReactNode,
  fallback: React.ReactNode,
}

export class ErrorBoundary extends React.Component<BoundaryProps> {
  state = {
    hasError: false
  };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // @ts-ignore
      return this.props.fallback;
    }
    // @ts-ignore
    return this.props.children;
  }
}