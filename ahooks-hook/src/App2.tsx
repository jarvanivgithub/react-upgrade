import { useEffect, useState } from 'react';
// import { useTimeout } from 'ahooks';
import useTimeout from './hooks/useTimeout';

export default () => {
  const [state, setState] = useState(1);
  const clearfn = useTimeout(() => {
    setState(state + 1);
  }, 3000);

  useEffect(() => {
    clearfn();
  }, [])

  return <div>{state}</div>;
};
