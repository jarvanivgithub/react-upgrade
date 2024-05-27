import { useEffect, useRef, useState } from 'react'

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(inputRef.current?.value)
      forceUpdate(Math.random());
    }, 2000)
  }, [inputRef.current])

  return <input ref={inputRef} defaultValue={'guang'} />
}

export default App;