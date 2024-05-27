import { useEffect, useRef } from "react";
import React from "react";

const Child: React.ForwardRefRenderFunction<HTMLInputElement> = (props, ref) => {
  return <div className="child-conainter">
    <input ref={ref}></input>
  </div>
}

const WrapedChild = React.forwardRef(Child);

function App() {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(ref.current)
    ref.current?.focus();
  }, [])

  return (
    <div className="app-container">
      <WrapedChild ref={ref}></WrapedChild>
    </div>
  )
}

export default App;