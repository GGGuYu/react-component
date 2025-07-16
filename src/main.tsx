// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import MiniCalendarTest from './MiniCalendarTest' //MiniCalendar的测试
import CalendarTest from './CalendarTest'



createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    // <MiniCalendarTest />
    <CalendarTest/>
  // </StrictMode>,
)
