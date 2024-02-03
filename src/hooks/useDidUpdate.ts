import { useEffect, useRef } from 'react';

export function useDidUpdate<T extends (...args: any[]) => void>(
  callback: T,
  dependencies: React.DependencyList = []
) {
  const didMountRef = useRef<boolean>(false);

  useEffect(() => {
    if (didMountRef.current) {
      callback();
    } else {
      didMountRef.current = true;
    }
  }, dependencies);
}