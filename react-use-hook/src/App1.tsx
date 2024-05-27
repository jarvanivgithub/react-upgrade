import { useState, useEffect } from 'react';
// import { useLifecycles } from 'react-use';
import useLifecycles from './hooks/useLifecycles';

const Child: React.FC = () => {
  useLifecycles(() => console.log('MOUNTED'), () => console.log('UNMOUNTED'));

  return <div>child</div>
}

export default function App() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000)
  }, [])

  return <div>
    {show ? <Child /> : null}
  </div>;
}