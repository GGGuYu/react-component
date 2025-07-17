function Header() {
    return <div className="calendar-header">
        <div className="calendar-header-left">
            {/* 上一个月的箭头 */}
            <div className="calendar-header-icon">&lt;</div>
            {/* 当前月份 */}
            <div className="calendar-header-value">2023 年 11 月</div>
            {/* 下一个月的箭头 */}
            <div className="calendar-header-icon">&gt;</div>
            {/* 跳转到今天 */}
            <button className="calendar-header-btn">今天</button>
        </div>
    </div>
}

export default Header;
