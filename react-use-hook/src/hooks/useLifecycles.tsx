import { useEffect } from "react";

export default function useLifecycles(mountedFn?: Function, unmountedFn?: Function) {
  useEffect(() => {
    mountedFn && mountedFn();
    return () => {
      unmountedFn && unmountedFn();
    }
  },)
}