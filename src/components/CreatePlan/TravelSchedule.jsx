import React, { useState, useRef, useEffect } from "react";
import SaveButton from "./button/SaveButton";
import AddDayButton from "./button/AddDayButton";
import DayList from "./button/DayList";


const TravelSchedule = () => {

    const [days, setDays] = useState(['1일차','2일차','3일차','4일차']);
    const [clicked, setClicked] = useState(null);

    //최대 10일까지 생성 가능하도록 임의 설정
    const maxDay = 10;

    const lastDayRef = useRef(null);

    const addDay = () => {
        if (days.length < maxDay) {
            setDays((prevDays) => {
                const newDays = [...prevDays, `${prevDays.length + 1}일차`];
                return newDays;
            });
        }
    };
    
    const handleButtonClick = (index) => {
        setClicked(index);
    };

    //추가된 일자 버튼에 스크롤 위치를 이동하는 함수
    const scrollToLastDay = () => {
        if (lastDayRef.current) {
            lastDayRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    // 일자 버튼 생성시 스크롤
    useEffect(() => {
        scrollToLastDay();
    },[days]);

    return (
        <div className="travel-day flex flex-col space-y-4">
            <div className="max-h-96 overflow-y-auto">
                <DayList days={days} onClick={handleButtonClick} clicked={clicked} lastDayRef={lastDayRef}/>
            </div>
            
            <div className="flex flex-col space-y-4 items-start">
                <AddDayButton onClick={addDay}/>
                <SaveButton />
            </div>
        </div>
    );
};
export default TravelSchedule;
