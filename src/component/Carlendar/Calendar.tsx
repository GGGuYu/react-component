import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import './index.scss'
import { MonthCalendar } from './MonthCalendar';
import Header from './Header';
import { useState, type CSSProperties, type ReactNode } from 'react';
import cs from 'classnames'

interface CalendarProps {
    value: Dayjs;
    style?: CSSProperties; //自定义样式
    className?: string | string[]; //自定义样式
    // 定制日期显示，会完全覆盖日期单元格
    dateRender?: (currentDate: Dayjs) => ReactNode;
    // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
    dateInnerContent?: (currentDate: Dayjs) => ReactNode;
    // 国际化相关
    locale?: string;
    onChange?: (date: Dayjs) => void;
}


//设计 ： 大组件里面是两个小组件组成的，分别是上面的Header和下面的整个月份的信息MonthCalendar
function Calendar(props:CalendarProps) {
    const {
        value,
        style,
        className,
        dateRender,
        dateInnerContent,
        onChange,
    } = props;

    const [curValue , setCurValue] = useState<Dayjs>(value);
    
    const selectHandler = (selectedDate:Dayjs) => {
        setCurValue(selectedDate);
        onChange?.(selectedDate);
    }

    const prevMonthHandler = () => {
        setCurValue((curValue) => curValue.subtract(1 , 'month'));
        onChange?.(curValue);
    }

    const nextMonthHandler = () => {
        setCurValue((curValue) => curValue.add(1 , 'month'));
        onChange?.(curValue);
    }

    const todayHandler = () => {
        setCurValue(dayjs(new Date()));
        onChange?.(curValue);
    }

    //这个是用来处理传入className的,classname的数组可以避免手动拼接产生错误
    const classNames = cs("calendar", className); 

    return (
        <div className={classNames} style={style}>
            <Header value={curValue} todayHandler={todayHandler} prevMonthHandler={prevMonthHandler} nextMonthHandler={nextMonthHandler}/>
            <MonthCalendar selectHandler={selectHandler} value={curValue} dateRender={dateRender} dateInnerContent={dateInnerContent}/>
        </div>
    )
}

export default Calendar;
export type { CalendarProps };