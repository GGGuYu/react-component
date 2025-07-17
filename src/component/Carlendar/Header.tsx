import type { Dayjs } from "dayjs";

interface HeaderProps {
    value:Dayjs,
    prevMonthHandler:() => void,
    nextMonthHandler:() => void,
    todayHandler:() => void,
}

function Header(props:HeaderProps) {

    const {
        value:date,
        prevMonthHandler,
        nextMonthHandler,
        todayHandler,
    } = props;

    return <div className="calendar-header">
        <div className="calendar-header-left">
            {/* 上一个月的箭头 */}
            <div onClick={() => prevMonthHandler()} className="calendar-header-icon">&lt;</div>
            {/* 当前月份 */}
            <div className="calendar-header-value">{date.year()} 年 {date.month() + 1} 月</div>
            {/* 下一个月的箭头 */}
            <div onClick={() => nextMonthHandler()} className="calendar-header-icon">&gt;</div>
            {/* 跳转到今天 */}
            <button onClick={() => todayHandler()} className="calendar-header-btn">今天</button>
        </div>
    </div>
}

export default Header;
