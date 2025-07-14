import Calendar from "./component/Calendar/Calendar";

function App() {
    return (
        <>
            <Calendar defaultDate={new Date(2024,11,15)} onChange={(date:Date)=>console.log(date)}></Calendar>
        </>
    )
}

export default App;