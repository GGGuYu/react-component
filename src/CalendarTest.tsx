import dayjs from "dayjs";
import Calendar from "./component/Carlendar/Calendar";

function CalendarTest() {
    const defaultValue = dayjs(new Date())
    return (
        <>
            <Calendar value={defaultValue}/>
        </>
    )
}

export default CalendarTest;