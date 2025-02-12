import React, { useContext, useState } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import DateSidebar from "./DateSideBar";
import MapDisplay from "./MapDisplay";
import ScheduleByDate from "./ScheduleByDate";
import PlaceSelection from "./PlaceSelection";
import { LoadScript } from '@react-google-maps/api';
import { 
    StyledMainLayout,
    StyledDateSidebar,
    StyledMapDisplay,
    StyleScheduleByDate,
} from './style/MainLayoutStyle';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const MainLayout =() => {
    const { proposal } = useContext(ProposalDetailContext);
    const [selectedPlaces, setSeletedPlaces] = useState([]);

    if(!proposal) {
        return <div>로딩중...</div>
    }

    const {arrivalCity} = proposal.data.travelPlan;
    
    
    return (
        <StyledMainLayout>
            <StyledDateSidebar>
                <DateSidebar /> 
            </StyledDateSidebar>
            
            <StyleScheduleByDate>
                <ScheduleByDate />
            </StyleScheduleByDate>
            
            <StyledMapDisplay>
                <MapDisplay 
                        arrivalCity={arrivalCity.name}
                        seletedPlaces={selectedPlaces}
                    />
            </StyledMapDisplay>
        </StyledMainLayout>

    );
};
export default MainLayout;