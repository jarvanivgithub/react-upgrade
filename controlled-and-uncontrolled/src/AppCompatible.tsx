import { useEffect, useRef, useState } from 'react'

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const {
    value: propsValue,
    defaultValue,
    onChange
  } = props;

  const [value, setValue] = useState(() => {
    if(propsValue !== undefined) {
      return propsValue;
    } else {
      return defaultValue;
    }
  })

  const isFristRender = useRef(true);

  useEffect(() => {
    if(propsValue === undefined && !isFristRender.current) {
      setValue(propsValue);
    }
    isFristRender.current = false;
  }, [propsValue])
  
  const mergedValue = propsValue === undefined ? value : propsValue;

  function changeValue(date: Date) {
    if(propsValue === undefined) {
      setValue(date);
    }
    onChange?.(date);
  }

  return <div>
    {mergedValue?.toLocaleDateString()}
    <div onClick={() => {changeValue(new Date('2024-5-21'))}}>2024-5-21</div>
    <div onClick={() => {changeValue(new Date('2024-5-22'))}}>2024-5-22</div>
    <div onClick={() => {changeValue(new Date('2024-5-23'))}}>2024-5-23</div>
  </div>
}

// function App() {
//   const [value, setValue] = useState(new Date('2024-5-20'));
//   return <Calendar value={value} onChange={(date) => {
//     console.log(date.toLocaleDateString())
//     setValue(date);
//   }}></Calendar>
// }

function App() {
  return <Calendar defaultValue={new Date('2024-5-20')} onChange={(date) => {
    console.log(date.toLocaleDateString())
  }}></Calendar>
}

export default App;