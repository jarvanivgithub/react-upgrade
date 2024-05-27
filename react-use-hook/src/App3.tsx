// import { useHover } from 'react-use';
import useHover from "./hooks/useHover";

const App = () => {
  const element = (hovered: boolean) => 
    <div>
      Hover me! {hovered && 'Thanks'}
    </div>
  
  const [hoverable, hovered] = useHover(element);

  return (
    <div>
      {hoverable}
      <div>{hovered ? 'HOVERED' : ''}</div>
    </div>
  )
}

export default App;