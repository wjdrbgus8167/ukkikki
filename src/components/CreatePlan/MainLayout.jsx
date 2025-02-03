//전체 레이아웃을 정의하는 컴포넌트
// 사이드바 + 지도 영역

import TravelPlanMap from "./TravelPlanMap";
import DateSideBar from "./SideBar";


const MainLayout = () => {
    return (
        <div>
            <DateSideBar />
            <TravelPlanMap />
        </div>
    )
};
export default MainLayout;