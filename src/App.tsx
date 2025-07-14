import { useState } from 'react';
import './mycss.css';

function Calendar() {

    //先要一个响应式变量存当前选择的日期，默认肯定是今天
    const [date , setDate] = useState<Date>(new Date());
    
    //后面的html有多少天是算出来的，day和empty,所以要写这个逻辑
    const renderDaysLayout = (date:Date) => {
        const result = []
        
        const days:number = new Date(date.getFullYear() , date.getMonth()+1 ,0).getDate()//这个月有多少天
        const firstday:number = new Date(date.getFullYear() ,date.getMonth(),1).getDay()//这年这个月的1号是星期几

        console.log(`days:${days}`)
        console.log(`firstday:${firstday}`)

        //注意 所有生产的div的key都要不一样哈
        //生产很多个empty来占空
        for(let i = 0;i < firstday;i++){
            result.push(<div key={`empty-${i}`} className="empty"></div>)
        }
        //生产所有的day
        for(let i = 1; i <= days;i++){
            result.push(<div key={i} className="day">{i}</div>)
        }

        return result;
    }
    

    //============按钮功能========================
    //点击上一个月按钮，会切换到上个月的第一天
    const handlePrevMonth = () => setDate((date) => {
        return new Date(date.getFullYear() , date.getMonth()-1 , 1)
    })

    const handleNextMonth = () => setDate((date) => {
        return new Date(date.getFullYear() , date.getMonth()+1 , 1)
    })

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>{date.getFullYear()}年{date.getMonth()+1}月</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDaysLayout(date)}
      </div>
    </div>
  );
}

export default Calendar;
