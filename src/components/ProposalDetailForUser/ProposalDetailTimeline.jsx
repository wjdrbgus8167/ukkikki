const ProposalDetailTimeline = ({ proposal, formatDateTime }) => {
  return (
    <div className="p-6 mt-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-xl font-bold">일정 타임라인</h2>
      {proposal.daySchedules.map((day) => (
        <div key={day.dayNumber} className="mb-8">
          {/* 일차 제목 */}
          <h3 className="mb-4 text-lg font-semibold">Day {day.dayNumber}</h3>
          {/* 타임라인 컨테이너 */}
          <div className="relative pl-4 border-l border-gray-300">
            {day.schedules.map((schedule, idx) => (
              <div key={idx} className="mb-6 ml-4">
                {/* 타임라인 점 */}
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 top-1.5 border border-white"></div>
                {/* 시간 정보 */}
                <time className="block mb-1 text-sm text-gray-500">
                  {formatDateTime(schedule.startTime)} -{' '}
                  {formatDateTime(schedule.endTime)}
                </time>
                {/* 일정 제목 */}
                <h4 className="font-medium text-gray-800 text-md">
                  {schedule.scheduleName}
                </h4>
                {/* 일정 이미지 (존재할 경우) */}
                {schedule.imageUrl && (
                  <img
                    src={schedule.imageUrl}
                    alt={schedule.scheduleName}
                    className="object-cover w-full max-w-xs mt-2 rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProposalDetailTimeline;
