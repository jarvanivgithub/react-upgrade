import { useState } from "react";
import { useInterval } from "./useInterval";

function App() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
  }

  const ct = useInterval(updateCount, 1000);

  setTimeout(() => { ct() }, 5000);

  return <div>{count}</div>
}

export default App;