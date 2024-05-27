import { useEffect, useRef, useState } from 'react'
import { useMergeState } from './useMergeState';

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

  // const [mergedValue, setValue] = useMergeState(new Date(), {
  //   value: propsValue,
  //   defaultValue
  // })

  // function changeValue(date: Date) {
  //   if(propsValue === undefined) {
  //     setValue(date);
  //   }
  //   onChange?.(date);
  // }

  // return <div>
  //   {mergedValue?.toLocaleDateString()}
  //   <div onClick={() => {changeValue(new Date('2024-5-21'))}}>2024-5-21</div>
  //   <div onClick={() => {changeValue(new Date('2024-5-22'))}}>2024-5-22</div>
  //   <div onClick={() => {changeValue(new Date('2024-5-23'))}}>2024-5-23</div>
  // </div>

  const [mergedValue, setValue] = useMergeState(new Date(), {
    value: propsValue,
    defaultValue,
    onChange
  })

  return <div>
    {mergedValue?.toLocaleDateString()}
    <div onClick={() => {setValue(new Date('2024-5-21'))}}>2024-5-21</div>
    <div onClick={() => {setValue(new Date('2024-5-22'))}}>2024-5-22</div>
    <div onClick={() => {setValue(new Date('2024-5-23'))}}>2024-5-23</div>
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