'use client';

import { useEffect, useRef } from 'react';
import { createScope } from 'animejs';

/**
 * Wraps anime.js createScope() for safe usage in React components.
 * Automatically reverts (cleans up) all animations on unmount.
 *
 * @param setupFn  Function that creates anime.js animations; receives the scope `self`.
 * @param deps     Dependency array – re-runs setup when these change (like useEffect).
 * @param enabled  When false the scope is not created (useful for InView gating).
 */
export function useAnimeScope<T extends HTMLElement = HTMLDivElement>(
  setupFn: (self: any) => void,
  deps: React.DependencyList = [],
  enabled = true,
) {
  const root = useRef<T>(null);
  const scope = useRef<any>(null);

  useEffect(() => {
    if (!enabled || !root.current) return;

    scope.current = createScope({ root: root as any }).add(setupFn);

    return () => {
      scope.current?.revert();
      scope.current = null;
    };
    // deps are spread intentionally; setupFn should be stable (useCallback if needed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  return { root, scope };
};