//전체 레이아웃을 정의하는 컴포넌트
// 사이드바 + 지도 영역

import TravelPlanMap from "./TravelPlanMap";
import PlanDateSideBar from "./PlanDateSideBar";
import TravelPlan from "./TravelPlan";
import { LoadScript } from '@react-google-maps/api';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;
const MainLayout = () => {
    return (
        <div className="flex items-start space-x-4">
            <PlanDateSideBar />
            <TravelPlan />

            <LoadScript googleMapsApiKey={apiKey}>
                <div className="flex items-start space-x-4">
                    <TravelPlanMap />
                </div>
            </LoadScript>
            
        </div>
    )
};
export default MainLayout;