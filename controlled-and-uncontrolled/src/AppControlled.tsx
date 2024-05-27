import { ChangeEvent, useState } from 'react'

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const {
    value = new Date(),
    onChange
  } = props;

  function changeValue(date: Date) {
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
  const [value, setValue] = useState(new Date('2024-5-20'));
  return <Calendar value={value} onChange={(date) => {
    console.log(date.toLocaleDateString())
    setValue(date);
  }}></Calendar>
}

export default App;