// 일짜 버튼
const DayList = ({ days, onClick, clicked }) => {
    return (
        <div className="day-list flex flex-col space-y-4">
            {days.map((day, idx) => {
                return (
                <button 
                key = {idx}
                onClick={() => onClick(idx)}
                className={`day-button text-black text-x font-semibold py-2 px-4 border-2 border-gray-300 rounded-lg w-24 h-16 
                    ${clicked === idx ? "bg-[#FFCF0E]" : "bg-white"}`}
                >
                    {day}
                </button>
           );
        })}
        </div>
    );
};
export default DayList;