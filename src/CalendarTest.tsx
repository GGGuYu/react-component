import dayjs from "dayjs";
import Calendar from "./component/Carlendar/Calendar";

function CalendarTest() {
    const defaultValue = dayjs(new Date())
    return (
        <>  
            {/* 自定义单元格渲染 */}
            {/* <Calendar className={'aaa'} style={{backgroundColor:'white'}} 
            value={defaultValue} 
            dateRender={(itemDate) => {
                    console.log('成功自定义')
                    return <div>
                    <p style={{background: 'yellowgreen', height: '50px'}}>{itemDate.format('YYYY/MM/DD')}</p>
                    </div>
                }}
            /> */}
            {/* 自定义Inner一些内容 */}
            <Calendar className={'aaa'} style={{backgroundColor:'white'}} 
            value={defaultValue} 
            dateInnerContent={(itemDate) => {
                let res = <div></div>
                if(itemDate.date() === 15) {
                        res = <div>插入内容</div>
                    }
                return res;
            }} //插入什么内容在数字下面 , 在15号下面插入
            onChange={(date) => console.log(`回调触发了:${date}`)}
            />
        </>
    )
}

export default CalendarTest;