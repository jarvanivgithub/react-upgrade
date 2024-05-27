import React, { useEffect, useImperativeHandle, useState, useRef } from 'react';
import './index.css';
import { useControllableValue } from 'ahooks';

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

interface CalendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

const InternalCalendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props, ref) => {
  const {
    value,
    defaultValue,
    onChange
  } = props;

  const [date, setDate] = useControllableValue(props, {
    defaultValue: new Date()
  });

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date) {
        setDate(date);
      }
    }
  })

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  }

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  }

  const monthNames = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];

  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDates = () => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    const clickHandler = (i: number) => {
      const curDate = new Date(date.getFullYear(), date.getMonth(), i);
      setDate(curDate);
      // onChange?.(curDate);
    }
    for (let i = 1; i <= daysCount; i++) {
      days.push(<div key={i} className={'day '.concat(i === date.getDate() ? 'selected' : '')} onClick={() => clickHandler(i)}>{i}</div>);
    }

    return days;
  }

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={() => handlePrevMonth()}>&lt;</button>
        <div>{date.getFullYear()}年{monthNames[date.getMonth()]}</div>
        <button onClick={() => handleNextMonth()}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDates()}
      </div>
    </div>
  );
}

const Calendar = React.forwardRef(InternalCalendar);

function Test() {
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef<CalendarRef>(null);
  useEffect(() => {
    setTimeout(() => {
      calendarRef.current?.setDate(new Date('2024-5-1'));
    }, 3000)
  }, [])

  return <div>
    {/* <Calendar ref={calendarRef} value={date} onChange={(date) => {
      setDate(date);
      console.log(date.toLocaleDateString())
    }}></Calendar> */}
    <Calendar ref={calendarRef} defaultValue={new Date('2024-5-20')} onChange={(date) => {
      console.log(date.toLocaleDateString())
    }}></Calendar>
  </div>
}

export default Test;