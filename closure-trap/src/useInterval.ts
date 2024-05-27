import { useEffect, useRef, useLayoutEffect, useCallback } from "react";

export function useInterval(fn: Function, delay?: number | null) {
  const callbackFn = useRef(fn);

  useLayoutEffect(() => {
    callbackFn.current = fn;
  })

  const cleanUpFnRef = useRef<Function>();
  const clean = useCallback(() => {
    cleanUpFnRef.current?.();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => callbackFn.current(), delay || 0);

    cleanUpFnRef.current = () => clearInterval(timer);

    return clean;
  }, []);

  return clean;
}
