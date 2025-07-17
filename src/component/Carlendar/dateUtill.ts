import type { Dayjs } from "dayjs"

interface InfoOfDate {
    date:Dayjs,
    isCurrentMonth:boolean //因为不是这个月的日期我们可以给一个暗淡的颜色
}

const getAllDays = (date:Dayjs) => {
    //根据当前日期，返回总共有多少天
    const numOfDays = date.daysInMonth();
    const firstDate = date.startOf('month');//这个月的第一天
    const firstDay = firstDate.day();//这个第一天是星期几
    const sizeOfCarlendarBox = 6*7;
    let NumOfPrevMonthDays = 0;//上个月的占位的日子有多少
    const res = Array<InfoOfDate>();

    //先是上个月的几天，也就是第一天前面空出来的
    for(let i = firstDay; i > 0;i--){
        const newDate:Dayjs = firstDate.subtract(i , 'day');
        res.push({
            date:newDate,
            isCurrentMonth:false,
        })
        NumOfPrevMonthDays++;
    }

    //本月的这么多天，从第一天开始
    for(let i = 0;i < numOfDays;i++){
        const newDate:Dayjs = firstDate.add(i , 'day');
        res.push({
            date:newDate,
            isCurrentMonth:true,
        })
    }

    //剩下的位置填充下一月的日期，注意应该是少于sizeOfCarlendarBox-NumOfPrevMonthDays总数-上个月-这个月numOfDays
    for(let i = numOfDays;i < sizeOfCarlendarBox-NumOfPrevMonthDays;i++){
        const newDate:Dayjs = firstDate.add(i , 'day');
        res.push({
            date:newDate,
            isCurrentMonth:false,
        })
    }

    return res;
}




export { getAllDays }
export type { InfoOfDate }