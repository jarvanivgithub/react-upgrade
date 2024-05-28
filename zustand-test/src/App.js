// import { create } from 'zustand';
import { create } from './MyZustand';
import { persist } from 'zustand/middleware'

const useXxxStore = create(logMiddleware(persist((set) => ({
  aaa: '',
  bbb: '',
  updateAaa: (value) => set(() => ({ aaa: value })),
  updateBbb: (value) => set(() => ({ bbb: value })),
}), {
  name: 'test'
})))

useXxxStore.subscribe((state) => {
  console.log(useXxxStore.getState());
})

function logMiddleware(func) {
  return function (set, get, store) {
    function newSet(...args) {
      console.log('调用了set', get());
      return set(...args);
    }
    return func(newSet, get, store);
  }
}

function Bbb() {
  return <div>
    <Ccc />
  </div>
}

function Ccc() {
  const aaa = useXxxStore((state) => state.aaa);
  return <p>hello, {aaa}</p>
}

export default function App() {
  const updateAaa = useXxxStore((state) => state.updateAaa);
  const aaa = useXxxStore((state) => state.aaa);

  return (
    <div>
      <input
        onChange={(e) => updateAaa(e.currentTarget.value)}
        value={aaa}
      />
      <Bbb />
    </div>
  )
}