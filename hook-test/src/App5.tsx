import { createContext, useContext } from "react";

const countContext = createContext(100);

function Aaa() {
  return <div>
    <countContext.Provider value={200}>
      <Bbb></Bbb>
    </countContext.Provider>
  </div>
}

function Bbb() {
  return <div><Ccc></Ccc></div>
}

function Ccc() {
  const count = useContext(countContext);
  return <h2>context的值为: {count}</h2>;
}

export default Aaa;