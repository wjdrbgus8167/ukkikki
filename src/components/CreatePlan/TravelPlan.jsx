import React, { useState } from "react";
import SaveButton from "./button/SaveButton";
import AddDayButton from "./button/AddDayButton";
import DayList from "./button/DayList";


const TravelPlan = () => {

    const [days, setDays] = useState(['1일차','2일차','3일차','4일차']);
    const [clicked, setClicked] = useState(null);

    
    const maxDay = 10;

    const addDay = () => {
        if (days.length < maxDay) {
            setDays([...days, `${days.length + 1}일차`])
        }
    };

    const handleButtonClick = (index) => {
        setClicked(index);
    }
    return (
        <div className="travel-day flex flex-col space-y-4">
            <div className="max-h-96 overflow-y-auto">
                <DayList days={days} onClick={handleButtonClick} clicked={clicked} />
            </div>
            
            <div className="flex flex-col space-y-4 items-start">
                <AddDayButton onClick={addDay}/>
                <SaveButton />
            </div>
        </div>
    )
};
export default TravelPlan;
