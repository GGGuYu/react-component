import React, { useEffect, useRef, useState } from "react";
import Calendar from "./component/MiniCalendar/Calendar";
import type { CalendarRef } from "./component/MiniCalendar/Calendar";

//用转发器包一下要抛出ref的组件
const MyCalendar = React.forwardRef(Calendar);

function MiniCalendarTest() {
    const calendarRef = useRef<CalendarRef>(null)

    // //使用effct来异步初始化一下Carlendar的值,测试暴露API
    useEffect(() => {
        setTimeout(() => {
            calendarRef.current?.setDate(new Date(2019,8,15))   
            console.log(`自己暴露的API调用：${calendarRef.current?.getDate()}`)
        } , 3000)
    } , [])   //这里应该会产生闭包，calendarRef不会被更新，因此其中的date还是原来的date

    //受控Calendar ， onChange中记得自己改值，不然肯定不生效，因为你自己调用方控制嘛，我们来试试
    const [date , setDate] = useState<Date>(new Date(2020 , 8 ,1)); //初始化为大学开学

    return (   
        <>
            {/* 非受控，暴露API版本的测试 */}
            {/* <MyCalendar ref={calendarRef} defaultValue={new Date(2024,11,15)} onChange={(date:Date)=>console.log(date)}></MyCalendar> */}
            {/* 受控版本 控制生效 */}
            <MyCalendar ref={calendarRef} value={date} onChange={(date:Date)=>setDate(date)}></MyCalendar>
            {/* 受控版本，不控制，所以不生效，但是能拿到最新值 */}
            {/* <MyCalendar ref={calendarRef} value={date} onChange={(date:Date)=>console.log(`拿到但是不控制：${date}`)}></MyCalendar> */}
            {/* 非受控模式，因为没有传入value ， 就和最一开始实现的效果一样 */}
            {/* <MyCalendar ref={calendarRef} defaultValue={new Date(2024,11,15)} onChange={(date:Date)=>console.log(`拿到但是由组件控制：${date}`)}></MyCalendar> */}
        </>
    )
}

export default MiniCalendarTest;