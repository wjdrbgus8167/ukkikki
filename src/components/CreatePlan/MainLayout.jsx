//전체 레이아웃을 정의하는 컴포넌트
// 사이드바 + 지도 영역

import TravelPlanMap from "./TravelPlanMap";
import PlanDateSideBar from "./PlanDateSideBar";
import TravelPlan from "./TravelPlan";

const MainLayout = () => {
    return (
        <div className="flex items-start space-x-4">
            <PlanDateSideBar />
            <TravelPlan />
            {/* <TravelPlanMap /> */}
        </div>
    )
};
export default MainLayout;