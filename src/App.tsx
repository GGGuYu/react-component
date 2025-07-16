import React, { useEffect, useRef } from "react";
import Calendar from "./component/Calendar/Calendar";
import type { CalendarRef } from "./component/Calendar/Calendar";

//用转发器包一下要抛出ref的组件
const MyCalendar = React.forwardRef(Calendar);

function App() {
    const calendarRef = useRef<CalendarRef>(null)

    //使用effct来异步初始化一下Carlendar的值
    useEffect(() => {
        setTimeout(() => {
            calendarRef.current?.setDate(new Date(2019,8,15))   
            console.log(`自己暴露的API调用：${calendarRef.current?.getDate()}`)
        } , 3000)
    } , [])   //这里应该会产生闭包，calendarRef不会被更新，因此其中的date还是原来的date


    return (
        <>
            <MyCalendar ref={calendarRef} defaultDate={new Date(2024,11,15)} onChange={(date:Date)=>console.log(date)}></MyCalendar>
        </>
    )
}

export default App;