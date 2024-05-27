import { useEffect, useState } from 'react';
import Calendar from './Calendar';
import dayjs, { Dayjs } from 'dayjs';

function App() {
  const [date, setDate] = useState<Dayjs>(dayjs(new Date()));

  useEffect(() => {
    setTimeout(() => {
      setDate(dayjs('2024-5-01'));
    }, 2000)
  }, [])

  return (
    <div className="App">
      <Calendar value={date} locale='en-US' onChange={(date) => {
        console.log(date.format('YYYY-MM-DD'))
      }} />
    </div>
  );
}

export default App;
