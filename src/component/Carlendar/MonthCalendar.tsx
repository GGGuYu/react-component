import type { Dayjs } from "dayjs";
import type { CalendarProps } from "./Calendar";
import type { InfoOfDate } from "./dateUtill";
import { getAllDays } from "./dateUtill";
import cs from 'classnames';

interface MonthCalendarPorps extends CalendarProps {
    selectHandler: (date: Dayjs) => void //传进来一个点击事件，然后点击的时候我改变date就行了
}

//有了数据以后就要渲染，渲染函数，返回6*7个div
const renderDays = (days:Array<InfoOfDate> , 
    date:Dayjs, //当前选择的日期，来确定哪个被选中
    selectHandler:MonthCalendarPorps['selectHandler'],
    dateRender?:MonthCalendarPorps['dateRender'] , //显示的内容自定义
    dateInnerContent?:MonthCalendarPorps['dateInnerContent'], //显示的单元格额外内容
) => {

    //一行一行的div代码
    const rows = []; //注意：每7个是一行
    //挨个处理成div放rows里面
    for(let i = 0;i < 6;i++){
        const row = [];//当前这一行有七个日期小格子
        for(let j = 0;j < 7;j++){
            const item = days[i*7+j];
            //每个小cell装进这一行
            row.push(
                <div onClick={() => selectHandler?.(item.date) } key={`${i}and${j}`} className={"calendar-month-body-cell " + (item.isCurrentMonth ? 'calendar-month-body-cell-current' : '')}>
                    {/* 这里每一个cell正常我只显示数字与用户要插入的内容就可以了 */}
                    {/* 但是如果它自定义了要如何显示每一个date的内容，我就把date给他的函数让他自己写 */}
                    { 
                        dateRender ? dateRender(item.date) : (
                        <div className="calendar-month-body-cell-date">
                            <div className={
                                cs("calendar-month-body-cell-date-value" , 
                                    date.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD') ? 'calendar-month-body-cell-date-selected' : '')
                                }>
                                {item.date.date()}
                            </div>
                            <div className="calendar-month-body-cell-date-content">
                                {dateInnerContent?.(item.date)}
                            </div>
                        </div>
                        )
                    }
                </div>
            )
        }
        //每一行套一个样式，因为里面要flex,然后再装进rows里面，其实分rows也行的
        rows.push(<div key={i} className="calendar-month-body-row">{row}</div>);
    }
    return rows;
}

//MonthCalendar的实现
export function MonthCalendar(props:MonthCalendarPorps) {
    const {
        value:date,
        dateRender,
        dateInnerContent,
        selectHandler,
    } = props;
    
    //基于当前Date.获取渲染需要的信息，这个月有多少天，第一天是星期几,这些都隐藏了
    //我直接返回了这6*7个格子要渲染的信息 , 把他在jsx中用函数渲染
    const res:Array<InfoOfDate> = getAllDays(date);
    

    const weekList = ['周日' , '周一' ,'周二' ,'周三' ,'周四' ,'周五' ,'周六']


    return (
        // 这个盒子里面也有两个部分，一个是周几的标题栏，下面才是真正的day
        <div className='calendar-month'>
            <div className="calendar-month-week-list">
                {
                /* 在这里渲染这几个周几的字 */
                weekList.map((week) => (
                    <div className="calendar-month-week-list-item" key={week}>
                        {week}
                    </div>
                ))
                }
            </div>
            <div className="calendar-month-body">
                {renderDays(res ,date,selectHandler, dateRender , dateInnerContent)}
            </div>
        </div>
        
    )
}