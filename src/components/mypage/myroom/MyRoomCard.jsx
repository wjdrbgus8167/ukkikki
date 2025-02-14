import React from "react";
import { STATUS_MAP, THEME_COLORS } from "../../../constants";


const MyRoomCard = ({ room, imageUrl }) => {
  return (
    <div className="flex flex-col justify-between h-full p-6 bg-white border border-gray-200 rounded-md shadow-lg">
      <div className="relative">
        {/* 상태 표시 */}
        <span
          className={`absolute top-6 left-2 px-3 py-1 rounded-full text-sm font-semibold ${
            STATUS_MAP[room.planningStatus] ? "bg-gray-500 text-white" : "bg-gray-400 text-white"
          }`}
        >
          {STATUS_MAP[room.planningStatus] || "상태 없음"}
        </span>

        {/* 여행지 이미지 */}
        <img
          src={imageUrl || "/default-image.jpg"}
          alt={room.arrivalCity?.name}
          className="object-cover w-full h-64 mt-4 rounded-lg shadow-md"
        />
      </div>

      <div className="flex flex-col flex-grow mt-4 space-y-4">
        {/* 방 제목 */}
        <h3 className="text-xl font-bold truncate">{room.name}</h3>

        {/* 모집 진행률 바 */}
        <div className="flex flex-col mt-4 space-y-2">
          <div className="w-full h-4 overflow-hidden bg-gray-200 rounded-full">
            <div
              className="h-full bg-yellow"
              style={{
                width: `${
                  room.minPeople > 0 && room.currentParticipants
                    ? Math.min(
                        (room.currentParticipants / room.minPeople) * 100,
                        100
                      )
                    : 0
                }%`,
              }}
            />
          </div>
          <div className="flex items-center justify-between text-sm font-medium text-gray-600">
            <span>현재 인원: {room.currentParticipants}명</span>
            <span>최소 모집인원: {room.minPeople}명</span>
          </div>
        </div>

        {/* 여행 날짜 */}
        <p className="text-black">
          <strong>여행 날짜:</strong> {room.startDate} ~ {room.endDate}
        </p>

        {/* 여행 테마 (키워드 ID 표시) */}
        <div className="flex flex-wrap gap-2">
          <strong>여행 테마:</strong>
          {room.keywords && room.keywords.length > 0 ? (
            room.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  THEME_COLORS[keyword.name] || "bg-gray-500 text-white"
                }`}
              >
                {keyword.name}
              </span>
            ))
          ) : (
            <span className="px-3 py-1 text-sm font-semibold text-gray-500 rounded-full">
              테마 없음
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRoomCard;


// const MyRoomCard = ({ room }) => {

//   return (
//     <div key={room.travelPlanId} className="p-4 bg-white rounded-lg shadow-md">
//       <h3 className="text-lg font-semibold">{room.name}</h3>
//       <p className="text-sm text-gray-600">
//         {room.departureCity?.name} → {room.arrivalCity?.name}
//       </p>
//       <p className="text-sm text-gray-600">
//         여행 기간: {room.startDate} ~ {room.endDate}
//       </p>
//       <p className="text-sm text-gray-600">
//         참가 인원: {room.currentParticipants}명 / {room.maxPeople}명
//       </p>
//       <span className="inline-block px-3 py-1 mt-2 text-sm text-white bg-blue-500 rounded">
//         {room.planningStatus}
//       </span>
//     </div>
//   );
// };

// export default MyRoomCard;
