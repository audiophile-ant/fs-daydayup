import { useEffect, useRef } from 'react';

export function useUpdateEffect(callback: () => void, dependencies: any[]) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      callback();
    } else {
      isMounted.current = true; // 组件已经挂载
    }
  }, dependencies);
}
