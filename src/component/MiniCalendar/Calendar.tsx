import React, { useImperativeHandle } from 'react';
import './index.css';
import { useControllableValue } from 'ahooks';

//P 参数
interface CalendarProps {
  value?:Date,
  defaultValue?:Date ,
  onChange?:(date:Date) => void
}

//T 自定义引用类型
interface CalendarRef {
  getDate:() => Date,
  setDate:(date:Date) => void,
}

const Calendar:React.ForwardRefRenderFunction<CalendarRef,CalendarProps> = (props:CalendarProps , ref) => {
    // const {
    //   value:PropsValue,
    //   defaultValue = new Date(), //这样可以写一个[默认值]，如果没有被解构出来
    //   onChange,
    // } = props; //不需要解构了，因为我用useControllableValue自定义hook

    //先要一个响应式变量存当前选择的日期，默认肯定是今天
    //useControllableValue支持受控和非受控，并且改变的时候自动调用onChange,我不用手动调用
    const [date , setDate] = useControllableValue<Date>(props , {
      defaultValue: new Date(), //超级默认
    });

    //把ref这个引用自定义成CalendarRef
    useImperativeHandle(ref , () => {
      return {
        getDate:() => date,
        setDate:(newDate:Date) => {
          setDate((date) => {
            console.log(`正在更新olddate:${date}为新的调用方插入的date:${newDate}`);
            return newDate;
          }); 
        },
      }
    });

    //点击日期的小盒子div,更新date的函数，先定义后使用
    const changeDateOnClickDiv = (year:number , month:number, date:number) => {
      const newDate:Date = new Date(year , month , date);
      setDate(newDate);
    }

    //根据当前的日期渲染布局，计算后面的html有多少天，day和empty,所以要写这个逻辑
    //这样我就只需要改变date,我就可以及时的渲染了，我的逻辑就都在改变date上
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
        //生产所有的day , 注意，day元素可以点击，点击修改date
        for(let i = 1; i <= days;i++){
            const div = <div key={i} className="day" onClick={()=>changeDateOnClickDiv(date.getFullYear(),date.getMonth(),i)}>{i}</div>;
            const divSelected = <div key={i} className="day selected" onClick={()=>changeDateOnClickDiv(date.getFullYear(),date.getMonth(),i)}>{i}</div>;
            if(i == date.getDate()) {
              result.push(divSelected)
            } else {
              result.push(div)
            }
            
        }

        return result;
    }
    

    //============按钮功能========================
    //点击上一个月按钮，会切换到上个月的第一天
    const handlePrevMonth = () => {
      const newDate:Date = new Date(date.getFullYear() , date.getMonth()-1 , 1);
      setDate(newDate);
    }

    const handleNextMonth = () => setDate((date) => {
        const newDate = new Date(date.getFullYear() , date.getMonth()+1 , 1);
        return newDate;
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
export type { CalendarRef };