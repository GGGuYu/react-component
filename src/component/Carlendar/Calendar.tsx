import type { Dayjs } from 'dayjs';
import './index.scss'
import { MonthCalendar } from './MonthCalendar';
import Header from './Header';

interface CalendarProps {
    value:Dayjs,
}

//设计 ： 大组件里面是两个小组件组成的，分别是上面的Header和下面的整个月份的信息MonthCalendar
function Calendar(props:CalendarProps) {
    const {
        value
    } = props;


    return (
        <div className="calendar">
            <Header />
            <MonthCalendar value={value}/>
        </div>
    )
}

export default Calendar;
export type { CalendarProps };