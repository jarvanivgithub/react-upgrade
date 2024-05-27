import { ChangeEvent, useState } from 'react'

interface CalendarProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const {
    defaultValue = new Date(),
    onChange
  } = props;

  const [value, setValue] = useState(defaultValue);

  function changeValue(date: Date) {
    setValue(date);
    onChange?.(date);
  }

  return <div>
    {value.toLocaleDateString()}
    <div onClick={() => {changeValue(new Date('2024-5-21'))}}>2024-5-21</div>
    <div onClick={() => {changeValue(new Date('2024-5-22'))}}>2024-5-22</div>
    <div onClick={() => {changeValue(new Date('2024-5-23'))}}>2024-5-23</div>
  </div>
}

function App() {
  return <Calendar defaultValue={new Date('2024-5-20')} onChange={(date) => {
    console.log(date.toLocaleDateString())
  }}></Calendar>
}

export default App;